// Alternative Express.js server implementation
// Run with: node server/index.js
// Make sure to set PORT and environment variables

const express = require('express');
const cors = require('cors');

// Initialize Stripe only if configured
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey && stripeKey !== 'sk_test_placeholder' ? require('stripe')(stripeKey) : null;

const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Firebase Admin (if using Firestore)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    stripe: !!stripe,
    firebase: admin.apps.length > 0
  });
});

/**
 * POST /create-checkout-session
 * Creates a Stripe Checkout Session
 */
app.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' 
      });
    }

    const { items, userId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get user email from Firestore (if using Firebase)
    let customerEmail = null;
    if (admin.apps.length > 0) {
      try {
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          customerEmail = userDoc.data().email;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/cart`,
      customer_email: customerEmail,
      metadata: {
        userId: userId,
      },
    });

    // Return session URL
    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

/**
 * POST /webhook
 * Stripe webhook endpoint for payment completion
 */
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const userId = session.metadata.userId;
      const customerEmail = session.customer_email;

      // Retrieve line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const items = lineItems.data.map(item => ({
        id: item.price.product,
        name: item.description || 'Product',
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: item.price.product_data?.images?.[0] || null,
      }));

      const total = session.amount_total / 100;

      // Create order in Firestore
      if (admin.apps.length > 0) {
        await admin.firestore().collection('orders').add({
          userId: userId,
          email: customerEmail,
          items: items,
          total: total,
          status: 'completed',
          stripeSessionId: session.id,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Clear user's cart
        await admin.firestore().collection('carts').doc(userId).set({
          items: [],
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      console.log('Order created successfully for user:', userId);
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ error: 'Error processing webhook' });
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


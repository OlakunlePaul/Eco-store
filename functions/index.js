const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const cors = require('cors')({ origin: true });

admin.initializeApp();

/**
 * Create Stripe Checkout Session
 * POST /createCheckoutSession
 * Body: { items: Array, userId: string }
 */
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { items, userId } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items array is required' });
      }

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Get user document to retrieve email
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = userDoc.data();
      const customerEmail = userData.email;

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
});

/**
 * Webhook to handle Stripe payment completion
 * This should be configured in Stripe Dashboard
 */
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
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

      console.log('Order created successfully for user:', userId);
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ error: 'Error processing webhook' });
    }
  }

  res.json({ received: true });
});


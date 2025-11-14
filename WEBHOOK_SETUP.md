# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks to automatically create orders in Firestore after successful payments.

## Why Webhooks?

When a customer completes payment through Stripe Checkout, Stripe sends a webhook event to your server. This allows you to:
- Automatically create orders in Firestore
- Clear the user's cart
- Send confirmation emails (optional)
- Update inventory (optional)

## Setup Steps

### 1. Get Your Webhook Secret

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook endpoint URL:
   - **Firebase Functions**: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/stripeWebhook`
   - **Express Server**: `https://your-domain.com/webhook`
4. Select events to listen for: `checkout.session.completed`
5. Copy the "Signing secret" (starts with `whsec_`)

### 2. Configure Webhook Secret

**For Firebase Functions:**

```bash
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"
```

**For Express Server:**

Add to your `.env` file:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 3. Deploy Your Functions

**Firebase Functions:**
```bash
cd functions
firebase deploy --only functions
```

**Express Server:**
Deploy your server to a hosting platform (Heroku, Railway, Render, etc.)

### 4. Test Webhooks Locally (Optional)

Use Stripe CLI to forward webhooks to your local server:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5001/webhook
```

## Testing

1. Make a test purchase using Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
2. Check your Firestore `orders` collection
3. Verify the order was created with correct data

## Troubleshooting

### Webhook Not Receiving Events

- Verify the endpoint URL is correct
- Check that your server is publicly accessible
- Ensure the webhook secret is correctly configured
- Check server logs for errors

### Orders Not Being Created

- Verify Firestore security rules allow writes
- Check that the webhook handler is correctly processing events
- Ensure Firebase Admin SDK is properly initialized
- Check server logs for detailed error messages

## Security Notes

- Never commit webhook secrets to version control
- Always verify webhook signatures
- Use HTTPS for webhook endpoints
- Regularly rotate webhook secrets


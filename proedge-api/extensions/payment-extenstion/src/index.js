

// extensions/endpoints/stripe/index.js
import Stripe from "stripe";

export default {
  id: "stripe-payments",
  handler: (router, { env, services, logger }) => {
    // Initialize Stripe with your test key
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    // Test endpoint
    router.get("/test", (req, res) => {
      logger.info("Stripe endpoint test");
      res.send("Stripe endpoint is working!");
    });

   // In your create-payment-intent endpoint
router.post("/create-payment-intent", async (req, res) => {
  console.log(req.body,"currency")
  try {
    const { amount, order_id, payment_method_types = ['card'], currency = 'usd', metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      payment_method_types: payment_method_types,
      metadata: {
        order_id: order_id,
        user_id: metadata?.user_id || 'guest',
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err) {
    logger.error(`Stripe error: ${err}`);
    res.status(500).json({ error: err.message });
  }
});

    // Verify Payment Status
    router.get("/payment-status/:paymentIntentId", async (req, res) => {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          req.params.paymentIntentId
        );
        
        res.json({
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          order_id: paymentIntent.metadata.order_id
        });
      } catch (err) {
        logger.error('Payment status error:', err);
        res.status(500).json({ error: 'Failed to verify payment' });
      }
    });

  },
};


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
  try {
    const { amount, currency = "usd" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: "payment_element",
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Stripe error:", err);
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
          order_id: paymentIntent.metadata.order_id,
        });
      } catch (err) {
        logger.error("Payment status error:", err);
        res.status(500).json({ error: "Failed to verify payment" });
      }
    });
  },
};

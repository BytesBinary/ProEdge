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

    // Create Checkout Session
   router.post("/create-session", async (req, res) => {
  try {
    const { amount, order_id, payment_method, currency = 'usd', metadata } = req.body;

    if (!amount || !order_id) {
      return res.status(400).json({ error: "Missing amount or order_id" });
    }

    // Define supported methods per currency
    const supportedMethods = {
      usd: ["card", "alipay", "klarna", "afterpay_clearpay", "link"],
      eur: ["card", "ideal", "klarna", "giropay", "sofort"],
      gbp: ["card", "klarna", "afterpay_clearpay"]
    };

    // Validate currency
    const validCurrency = supportedMethods[currency.toLowerCase()] 
      ? currency.toLowerCase() 
      : 'usd';
    const allowedMethods = supportedMethods[validCurrency];

    // Validate payment method
    if (!allowedMethods.includes(payment_method)) {
      return res.status(400).json({ 
        error: `Payment method ${payment_method} not supported for currency ${validCurrency}`,
        supported_methods: allowedMethods
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [payment_method],
      line_items: [{
        price_data: {
          currency: validCurrency,
          product_data: { name: `Order #${order_id}` },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${env.FRONTEND_URL}/order-details?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/payment-cancel?order_id=${order_id}`,
      metadata: {
        ...metadata,
        order_id,
        currency: validCurrency,
        payment_method
      }
    });

    res.json({
      session_id: session.id,
      url: session.url,
      currency: validCurrency,
      payment_method
    });

  } catch (err) {
    logger.error(`Stripe error: ${err}`);
    res.status(500).json({ error: err.message });
  }
});


// Fetch Checkout Session Details
router.get('/session-details/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (err) {
    logger.error('Stripe session details error:', err);
    res.status(500).json({ error: 'Failed to fetch session details' });
  }
});

  },
};

// extensions/stripe/index.js
export default {
  id: 'stripe-payments',
  handler: (router, context) => {
    const stripe = require('stripe')(context.env.STRIPE_SECRET_KEY);
    const { Services, exceptions } = context;
    
    // Create Checkout Session endpoint
    router.post('/create-session', async (req, res) => {
      try {
        const { amount, currency = 'usd', order_id } = req.body;
        
        if (!amount || !order_id) {
          throw new exceptions.BadRequestException('Missing required fields');
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency,
              product_data: { name: `Order #${order_id}` },
              unit_amount: amount,
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: `${context.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${context.env.FRONTEND_URL}/checkout`,
          metadata: { order_id }
        });

        return res.json({ 
          session_id: session.id,
          url: session.url
        });
        
      } catch (err) {
        context.logger.error(`Stripe error: ${err}`);
        return res.status(500).json({ error: err.message });
      }
    });

    // Webhook endpoint
    router.post('/webhook', async (req, res) => {
      const sig = req.headers['stripe-signature'];
      
      try {
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          context.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object;
          const ordersService = new Services.ItemsService('orders', {
            knex: context.database,
            schema: req.schema
          });

          await ordersService.updateOne(session.metadata.order_id, {
            payment_status: 'paid',
            stripe_session_id: session.id
          });
        }

        res.json({ received: true });
      } catch (err) {
        context.logger.error(`Webhook error: ${err}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    });
  }
};
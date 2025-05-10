import Stripe from 'stripe';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const rawParser = express.raw({ type: 'application/json' }); // Required for Stripe signature

export default function registerHook({ app, services }) {
  const { ItemsService } = services;

  app.post('/webhook/stripe', rawParser, async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('❌ Webhook verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const ordersService = new ItemsService('orders', { schema: req.schema });

      const { data: orders } = await ordersService.readByQuery({
        filter: { stripe_session_id: { _eq: session.id } },
        limit: 1,
      });

      if (orders.length > 0) {
        const order = orders[0];
        await ordersService.updateOne(order.id, {
          payment_status: 'paid',
        });
        console.log('✅ Order marked as paid:', order.id);
      } else {
        console.warn('⚠️ Order not found for session:', session.id);
      }
    }

    res.status(200).send('Webhook received');
  });
}

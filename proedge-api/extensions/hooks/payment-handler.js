import Stripe from 'stripe';

import dotenv from 'dotenv';

dotenv.config(); 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function registerHook({ services }) {
  const { ItemsService } = services;

  return {
    'items.create.order': async function (input, { schema }) {
      const order = input.payload;

      // For testing, set defaults if not sent
      const productName = order.product_name || "RickshawMama Order";
      const quantity = order.quantity || 1;
      const totalAmount = order.subtotal || 100;

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: productName },
              unit_amount: totalAmount * 100, 
            },
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3001/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3001/payment-cancel`,
      });

      // Save the Stripe session ID in Directus
      const ordersService = new ItemsService('order', { schema });
      await ordersService.updateOne(order.id, {
        stripe_session_id: session.id,
        payment_status: 'pending'
      });

      // Optionally: return updated order data
      return input;
    }
  };
}

// src/pages/checkout/PaymentSection.jsx
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentSection = ({
  onPaymentSuccess,
  onPaymentError,
  email,
  orderSummary
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Validate payment fields
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: email,
        },
        redirect: 'if_required' // Handle redirects manually
      });

      if (stripeError) throw stripeError;

      // Handle successful payment
      if (paymentIntent && paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      } else {
        throw new Error("Payment processing failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      onPaymentError(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-section">
       <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
              4. Payment
            </h1>
      {orderSummary && (
        <div className="order-summary mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Total</h3>
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Shipping:</span>
            <span>${orderSummary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total:</span>
            <span>${orderSummary.total.toFixed(2)}</span>
          </div>
        </div>
      )}

        <PaymentElement 
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false
            }
          }}
        />
        
        <button
         onClick={handleSubmit}
          disabled={!stripe || processing}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            processing 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            'Pay Now'
          )}
        </button>

        {error && (
          <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}

      <div className="mt-4 text-xs text-gray-500">
        Your payment is securely processed by Stripe. We don't store your card details.
      </div>
    </div>
  );
};

export default PaymentSection;
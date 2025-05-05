import React from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

const PaymentOption = ({ method, onChange }) => {
  const paymentMethods = [
    {
      id: 'credit-card',
      label: 'Credit/Debit Card',
      icon: <FaCreditCard className="mr-2" />,
      className: 'bg-[#3F66BC] text-white'
    },
    {
      id: 'paypal',
      label: 'PayPal',
      icon: <FaPaypal className="mr-2" />,
      className: 'bg-white text-[#3F66BC] border border-[#ECF0F9]'
    },
    {
      id: 'bank-transfer',
      label: 'Bank Transfer',
      icon: <span className="mr-2">🏦</span>,
      className: 'bg-white text-[#3F66BC] border border-[#ECF0F9]'
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {paymentMethods.map((payment) => (
        <button
          key={payment.id}
          type="button"
          className={`flex items-center text-md font-semibold py-3 px-4 rounded-full transition-all ${
            method === payment.id 
              ? 'bg-[#3F66BC] text-white shadow-md' 
              : payment.className
          } hover:shadow-md`}
          onClick={() => onChange(payment.id)}
        >
          {payment.icon}
          {payment.label}
        </button>
      ))}
    </div>
  );
};

export default PaymentOption;
import React from 'react';
import RadioOption from '../common/form/RadioOption';

const DeliveryMethod = ({ selectedMethod, onChange }) => {
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'delivery_method',
      label: 'Free! Standard Ground (3-5 business days)',
      value: 'standard',
      shippingCharge: 0
    },
    {
      id: 'express',
      name: 'delivery_method',
      label: 'Express Delivery (1-2 business days)',
      value: 'express',
      shippingCharge: 15
    },
    {
      id: 'overnight',
      name: 'delivery_method',
      label: 'Overnight Delivery',
      value: 'overnight',
      shippingCharge: 25
    }
  ];

  return (
    <div className="w-full">
      <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
        2. Delivery Method
      </h1>
      <div className="space-y-2">
        {deliveryOptions.map((option) => (
          <RadioOption
            key={option.id}
            id={option.id}
            name={option.name}
            label={option.label}
            checked={selectedMethod === option.value}
            onChange={() => onChange(option.value, option.shippingCharge)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethod;
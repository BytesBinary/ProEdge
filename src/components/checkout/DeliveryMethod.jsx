// components/checkout/DeliveryMethod.jsx
import React from 'react';
import RadioOption from '../common/form/RadioOption';


const DeliveryMethod = ({ selected = 'standard', onChange }) => {
  return (
    <div className="max-w-md w-full">
      <h1 className="text-[#182B55] text-xl md:text-3xl font-semibold mb-4">
        2. Delivery Method
      </h1>
      <RadioOption
        id="standard"
        name="delivery_method"
        label="Free! Standard Ground"
        checked={selected === 'standard'}
        onChange={() => onChange?.('standard')}
      />
    </div>
  );
};

export default DeliveryMethod;

import React from 'react';

const RadioOption = ({ id, name, label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-[#FFFFFF]">  
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor={id} className="text-gray-800">
        {label}
      </label>
    </div>
  );
};

export default RadioOption;

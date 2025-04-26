// src/components/common/form/TextInput.jsx
import React from 'react'

const TextInput = ({ label, id, type = "text", name, placeholder, required = false }) => {
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-[#182B55] text-lg font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full p-4 px-6 mt-4 border border-[#ECF0F9] rounded-4xl bg-[#F8F9FB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
    </div>
  )
}

export default TextInput

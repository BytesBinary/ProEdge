import React from 'react'

const LabelInput = ({ label, id, name, type = "text", required, value, onChange, className = "" })  => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block font-medium text-[#182B55]">
                {label}{required && '*'}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border-2 border-[#ECF0F9] bg-[#FFFFFF] rounded-md p-2 mt-1 focus:outline-none focus:border-blue-500"
            />
        </div>
    );
}

export default LabelInput;
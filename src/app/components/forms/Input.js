// components/InputField.js
import React from 'react';

const Input = ({ 
  type = "text", 
  label,
  name, 
  value, 
  onChange, 
  placeholder, 
  className = "" 
}) => {
  return (
    <>
    <label className='capitalize'>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 w-full focus:ring-gray-500 focus:border-gray-500 ${className}`}
    />
    </>
  )
}

export default Input

// components/InputField.js
import React from 'react';

const CheckBox = ({ 
  type = "checkbox", 
  label,
  name, 
  value, 
  onChange, 
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
      className={`rounded w-3 h-3 ${className}`}
    />
    </>
  )
}

export default CheckBox

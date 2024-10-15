// components/InputField.js
import React from 'react';

const SearchInput = ({ 
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
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 w-full active:border-gray-400 ${className}`}
    />
    </>
  )
}

export default SearchInput

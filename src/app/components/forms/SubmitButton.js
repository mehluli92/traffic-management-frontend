// components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ 
  onClick, 
  label = "Submit", 
  className = "",
  saving = false
}) => {
  const baseClassNames = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300";

  if(saving) return <button className={`${baseClassNames}`} >Saving...</button>
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${baseClassNames} ${className}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;

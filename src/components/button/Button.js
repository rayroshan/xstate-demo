import React from 'react';

const Button = ({ label, onClick, disabled = false }) => {
  return (
    <button
      className={`
      ${disabled ? 'text-white cursor-not-allowed' : 'text-white cursor-pointer'}
      ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black cursor-pointer hover:opacity-80'}
        uppercase 
        text-sm 
        px-4 
        py-2.5 
        w-full
        mt-3`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;

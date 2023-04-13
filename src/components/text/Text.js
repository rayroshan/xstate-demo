import React from 'react';

const Text = ({ id, type, name, label, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-2">
      <div>
        <label className="font-light text-sm">* {label}</label>
      </div>
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`w-full 
          p-2
          mt-1
          border
          ${value && !error ? 'border-green-500' : 'border-black'}
          ${value && error ? 'border-red-500' : 'border-black'}
          `}
        />
        {value && !error && <i className="fa fa-check text-green-600 absolute top-4 right-2 text-lg"></i>}
      </div>
      {error && <div className="text-sm text-red-600 mt-1 -mb-3">{error}</div>}
    </div>
  );
};

export default Text;

import React from 'react';

const Collapsable = ({ step, title, children, open = false, disabled = false, onClick }) => {
  return (
    <div onClick={disabled ? () => {} : onClick} className={disabled ? 'cursor-not-allowed text-gray-500' : ''}>
      <div className="flex items-top">
        <div
          className={`
          ${disabled ? 'text-gray-700 bg-gray-200' : 'text-white bg-black '}
        w-6 h-6 text-xs p-0 rounded-full  flex items-center justify-center mr-2
        `}
        >
          {step}
        </div>
        <div className="w-full">
          <div className="font-bold uppercase">{title}</div>
          {!open || disabled ? <></> : children}
        </div>
      </div>
    </div>
  );
};

export default Collapsable;

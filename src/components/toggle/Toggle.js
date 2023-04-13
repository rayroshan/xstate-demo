import React from 'react';

function ToggleSwitch({ label, onChange, isActive }) {
  return (
    <div className="flex items-center justify-center">
      <label className="text-sm font-semibold mb-1.5 block mt-1.5">{label}</label>
      <div className="relative inline-block w-10 align-middle select-none">
        <input type="checkbox" name="toggle" id="toggle" className="hidden" checked={isActive} onChange={onChange} />
        <label
          htmlFor="toggle"
          className={`block overflow-hidden h-6 rounded-full  cursor-pointer ${
            isActive ? 'bg-blue-500' : 'bg-gray-400'
          }`}
        >
          <div
            className={`transform transition-all duration-300 w-5 h-5 mt-[2px] rounded-full shadow-lg ${
              isActive ? 'translate-x-[18px] bg-white' : 'translate-x-[2px] bg-white'
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
}

export default ToggleSwitch;

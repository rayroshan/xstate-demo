import React, { useState } from 'react';

const Console = ({ title, data }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="w-full bg-black fixed bottom-0  text-white">
      <div className="flex justify-between text-base font-semibold p-4">
        <div>Arc'teryx Console</div>
        <div className="cursor-pointer hover:text-gray-500 text-white" onClick={() => setCollapsed(!collapsed)}>
          <i className={!collapsed ? 'fa fa-chevron-down' : 'fa fa-chevron-up'}></i>
        </div>
      </div>
      {!collapsed && (
        <div className="text-xs p-4 bg-slate-900 ">
          <pre className="font-semibold text-yellow-300">{title}</pre>
          <pre className="ml-2 mt-2">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Console;

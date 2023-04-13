import React from 'react';

const CartItem = ({ title, description, label, quantity, price, img }) => {
  return (
    <div className="flex bg-gray-50 p-2 gap-4 mb-2">
      <div className="w-1/5">
        <img src={img} />
      </div>
      <div className="w-5/6 text-xs">
        {title && <div className="font-bold text-sm">{title}</div>}
        <div>{description}</div>
        <div className="italic">{label}</div>
        <div className="flex justify-between w-full">
          <div>Quantity: {quantity}</div>
          <div>${price?.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

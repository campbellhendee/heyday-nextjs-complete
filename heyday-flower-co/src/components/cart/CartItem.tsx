import React from 'react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
      <div className="flex-1 mx-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded mx-2"
        />
        <button onClick={() => onRemove(item.id)} className="text-red-500">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
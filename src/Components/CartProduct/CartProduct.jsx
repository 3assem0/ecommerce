import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function CartProduct({ product, setCart }) {
  const [quantity, setQuantity] = useState(product.quantity);

  // Remove product from cart
  const removeProductFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
    toast.success("Product has been removed successfully");
  };

  // Update product quantity
  const updateProductQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
      if (item._id === product._id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
    setQuantity(newQuantity);
  };

  return (
    <div className="flex justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
      <img src={product.imageCover} alt={product.title} className="w-40 rounded-lg" />
      <div className="flex flex-col justify-between ml-4 flex-grow">
        <div>
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="mt-1 text-sm">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={() => updateProductQuantity(quantity - 1)}
            disabled={quantity === 1}
            className="px-2 py-1 bg-gray-200"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => updateProductQuantity(Number(e.target.value))}
            className="mx-2 w-12 text-center border"
          />
          <button
            onClick={() => updateProductQuantity(quantity + 1)}
            className="px-2 py-1 bg-gray-200"
          >
            +
          </button>
          <button
            onClick={() => removeProductFromCart(product._id)}
            className="ml-auto text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

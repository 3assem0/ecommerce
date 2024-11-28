import React, { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import { toast } from 'react-toastify';
import './cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCartData();
  }, []);

  // Fetch cart data from local storage
  const getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  };

  // Clear the cart
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    toast.success("Cart has been cleared successfully");
  };

  if (cart.length === 0) {
    return <h1 className="text-center text-2xl font-bold">No Products in your cart</h1>;
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="pt-10 mb-10 w-full">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart products */}
        <div className="rounded-lg md:w-2/3">
          {cart.map((product, index) => (
            <CartProduct key={index} product={product} setCart={setCart} />
          ))}
        </div>

        {/* Cart summary */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${totalPrice.toFixed(2)} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          {/* Checkout button */}
          <button className="mt-6 block text-center w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
      {/* Clear Cart button */}
      <button
        onClick={clearCart}
        className="text-red-500 border-2 m-10 border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500 block mx-auto"
      >
        Clear Cart
      </button>
    </div>
  );
}

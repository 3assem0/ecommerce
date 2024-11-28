// import React from 'react';
import './Products.css';
import RatingStars from '../Ratingstars/RatingStars';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Products({ product }) {

  // Function to add product to cart using local storage
  const handleAddToCart = () => {
    // Get existing cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.title} has been added to your cart!`);
  };

  return (
    <div className="mx-auto grid productcont mt-20">
      <article className="rounded-xl p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={`/ProductDetails/${product._id}`}>
            <img src={product.imageCover} alt="product" />
          </Link>
        </div>

        <div className="mt-1 p-2">
          <Link to={`/ProductDetails/${product._id}`}>
            <h2 className="text-slate-700 line-clamp-1">{product.title}</h2>
          </Link>
          <p className="mt-1 text-sm text-slate-400 line-clamp-2">{product.description}</p>
          
          <div className="mt-3 flex addbut items-end justify-between">
            <p className="text-lg pricep font-bold text-blue-500">${product.price}</p>
            <RatingStars rating={product.ratingsAverage} />
          </div>

          {/* Add to cart button */}
          <div className="flex mt-4 mx-auto items-center w-fit justify-center">
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white duration-100 hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

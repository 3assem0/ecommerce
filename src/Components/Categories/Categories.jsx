import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import RatingStars from '../Ratingstars/RatingStars';
import { addProductToCart } from '../../cartService';
import { AuthContext } from '../../Context.jsx/AuthContext';
import { toast } from 'react-toastify';
import Products from '../Products/Products';

// Static categories and products
const categories = [
  { id: 1, name: "Personal Computers", image: "https://th.bing.com/th/id/OIP.YxR2s2V__rXXt5YRwf6oDAHaFx?rs=1&pid=ImgDetMain" },
  { id: 2, name: "Smart Phones", image: "http://ts2.mm.bing.net/th?id=OIP.0anWZGqrix4F7MEqCVs5qgHaEK&pid=15.1" },
  { id: 3, name: "Hardware Accessories", image: "https://th.bing.com/th/id/OIP.g4nUfcAvnvdh8nDfysZ32wHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.1&pid=1.7" },
  { id: 5, name: "Application Software", image: "https://th.bing.com/th/id/OIP.GsaCx1vRXTfvYzpOVJFiugHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" },
  { id: 6, name: "System Software", image: "https://th.bing.com/th/id/OIP.hrBTi6_-lj-SVwu03EEBQQHaHa?w=161&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" },
];

const staticProducts = {
  1: [
    { _id: 101, title: "Dell XPS 13", price: 999.99, imageCover: "https://th.bing.com/th/id/OIP.YxR2s2V__rXXt5YRwf6oDAHaFx?rs=1&pid=ImgDetMain", description: "High-performance laptop", ratingsAverage: 4.5 },
    { _id: 102, title: "MacBook Pro", price: 1299.99, imageCover: "https://th.bing.com/th/id/OIP.hjV8H8ddOWZ4DCsFDfvMzgHaE8?w=249&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Powerful MacBook for professionals", ratingsAverage: 4.8 },
  ],
  2: [
    { _id: 201, title: "iPhone 12", price: 799.99, imageCover: "http://ts2.mm.bing.net/th?id=OIP.0anWZGqrix4F7MEqCVs5qgHaEK&pid=15.1", description: "Latest Apple smartphone", ratingsAverage: 4.7 },
    { _id: 202, title: "Samsung Galaxy S24", price: 699.99, imageCover: "https://th.bing.com/th/id/OIP.-v4Cd4U_-oIF9kkkWoGM4wAAAA?rs=1&pid=ImgDetMain", description: "Cutting-edge Android device", ratingsAverage: 4.6 },
  ],
  3: [
    { _id: 301, title: "Logitech Mouse", price: 29.99, imageCover: "https://th.bing.com/th/id/OIP.g4nUfcAvnvdh8nDfysZ32wHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Ergonomic wireless mouse", ratingsAverage: 4.3 },
    { _id: 302, title: "Mechanical Keyboard", price: 89.99, imageCover: "https://th.bing.com/th/id/OIP.rc5PKcrGbnk_0HZlLHlSSQHaEK?w=302&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "High-quality mechanical keyboard", ratingsAverage: 4.7 },
    { _id: 303, title: "Wireless Headphones", price: 49.99, imageCover: "https://th.bing.com/th/id/OIP.OctJq06i6wIxTXsGBFIx9AHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Noise-cancelling wireless headphones", ratingsAverage: 4.5 },
    { _id: 304, title: "External Hard Drive", price: 99.99, imageCover: "https://th.bing.com/th/id/OIP.aQEqX-dm6leCMaN2RtbjcQHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "1TB external hard drive", ratingsAverage: 4.4 },
  ],
  5: [
    { _id: 501, title: "Microsoft Office", price: 149.99, imageCover: "https://th.bing.com/th/id/OIP.GsaCx1vRXTfvYzpOVJFiugHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Office productivity suite", ratingsAverage: 4.6 },
    { _id: 502, title: "Adobe Photoshop", price: 239.99, imageCover: "https://th.bing.com/th/id/OIP.zuHWHV8Q7tMBmlVtWSvRQAHaF5?w=236&h=187&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Professional photo editing software", ratingsAverage: 4.8 },
    { _id: 503, title: "AutoCAD", price: 199.99, imageCover: "https://th.bing.com/th/id/OIP._INtcUq8VcIQBM3Fh8XPCAHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "CAD software for 2D and 3D design", ratingsAverage: 4.7 },
    { _id: 504, title: "Final Cut Pro", price: 299.99, imageCover: "https://th.bing.com/th/id/OIP.5-m3gBl9Pj8vTQkNMRdVoQHaEo?w=236&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Professional video editing software", ratingsAverage: 4.9 },
  ],
  6: [
    { _id: 601, title: "Windows 11", price: 139.99, imageCover: "https://th.bing.com/th/id/OIP.hrBTi6_-lj-SVwu03EEBQQHaHa?w=161&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", description: "Latest Microsoft operating system", ratingsAverage: 4.5 },
    { _id: 602, title: "Linux Ubuntu", price: 0.00, imageCover: "https://th.bing.com/th/id/R.2a597cab109596b4e37e7721336804f6?rik=%2fYCDrfYJLfyj%2bw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-L5sH-DTc3QQ%2fU1Csgolo72I%2fAAAAAAAACSM%2fKFNiGaJxJ0o%2fs1600%2fubuntu_logo2.jpg&ehk=dPPj%2fcO9foEEBZvrAlbz5zQTkXtr3Cj4khh5Gk8kZgE%3d&risl=&pid=ImgRaw&r=0", description: "Popular open-source operating system", ratingsAverage: 4.7 },
    { _id: 603, title: "macOS", price: 0.00, imageCover: "https://appletoolbox.com/wp-content/uploads/2021/05/macOS-Featured-image.jpg", description: "Apple's operating system for Mac", ratingsAverage: 4.8 },
    { _id: 604, title: "Android OS", price: 0.00, imageCover: "https://th.bing.com/th/id/OIP.MbWfJyTCxHO54guqewc1BAHaE3?rs=1&pid=ImgDetMaing", description: "Google's mobile operating system", ratingsAverage: 4.6 },
  ],
};

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State for selected category

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Reset to show categories
  const resetSelection = () => {
    setSelectedCategoryId(null);
  };

  // Function to add product to cart using local storage
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      {selectedCategoryId === null ? (
        // Display categories
        <div className="flex flex-wrap gap-6 mt-1">
          {categories.map((category) => (
            <div
              key={category.id}
              className="mx-auto mt-3 flex bg-gray-100 flex-col justify-between w-64 cursor-pointer transform overflow-hidden rounded-lg duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              <img
                className="w-full object-cover object-center"
                src={category.image}
                alt={category.name}
              />
              <div className="p-4">
                <h3 className="text-center font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display products for selected category
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={resetSelection}
          >
            Back to Categories
          </button>
          <div className="flex gap-5 flex-wrap">
            {staticProducts[selectedCategoryId]?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {staticProducts[selectedCategoryId].map((product) => (
                  <div  key={product._id}>
                    <Products key={product._id} product={product} />
                    {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No products available for this category.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

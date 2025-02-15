import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../Ratingstars/RatingStars';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './ProductDeatils.css';
import ProImgSlider from '../ProImgSlider/ProImgSlider';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { AuthContext } from '../../Context.jsx/AuthContext';
import { addProductToCart } from '../../cartService';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  // Fetch product details
  async function getProductDetails() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      getRelatedProducts(data.data?.category._id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch related products by category
  async function getRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/products/',
        {
          params: {
            category: categoryId,
          },
        }
      );
      setRelatedProduct(data.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  // Add product to cart
  const handleAddToCart = () => {
    if (!userToken) {
      toast.error('Please log in to add to cart.');
      return;
    }

    addProductToCart(productDetails._id, userToken)
      .then(() => {
        toast.success(`${productDetails.title} added to cart!`);
      })
      .catch((error) => {
        toast.error('Failed to add to cart. Please try again.');
        console.error('Error adding to cart:', error);
      });
  };

  // Add product to wishlist
  const handleAddToWishlist = () => {
    if (!userToken) {
      toast.error('Please log in to add to wishlist.');
      return;
    }
    // Implement wishlist function
    // addProductToWishList(productDetails._id, userToken);
  };

  // Function to add product to cart using local storage
  const addToCart = () => {
    const product = productDetails;

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
    toast.success(`${product.title} added to cart`);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="py-8 md:py-16 antialiased overflow-hidden">
      <div className="max-w-screen xs:pt-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 details">
          {/* Product Images */}
          <div className="shrink-0 p-10 max-w-xs lg:max-w-xs mx-auto proimgdet">
            <ProImgSlider images={productDetails?.images} />
          </div>

          {/* Product Information */}
          <div className="mt-6 sm:mt-8 p-5 ml-5 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {productDetails?.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                ${productDetails?.price}
              </p>
            </div>
            <div className="mt-2 flex">
              <RatingStars rating={productDetails?.ratingsAverage ?? 0} />
            </div>

            {/* Product Description */}
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                Description:
              </label>
              <h3>{productDetails?.description}</h3>
            </div>

            {/* Product Category */}
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                Category:
              </label>
              <h3>{productDetails?.category?.name}</h3>
            </div>

            {/* Product Subcategory */}
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                SubCategory:
              </label>
              <h3>{productDetails?.subcategory?.[0]?.name}</h3>
            </div>

            {/* Product Brand */}
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                Brand:
              </label>
              <h3>{productDetails?.brand?.name}</h3>
            </div>

            {/* Add to Wishlist & Cart Buttons */}
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {/* Add to Wishlist Button */}
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to favorites
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {productDetails?.description}
            </p>
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={relatedProduct} />
      </div>
    </section>
  );
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick/lib/slider'
import { AuthContext } from '../../Context.jsx/AuthContext';
import { addProductToCart } from '../../cartService';

export default function RelatedProducts({products}) {
    let {userToken} = useContext(AuthContext)

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4
      };
  return (
    
    <div className="mt-2 p-10 ">
    <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
    {products.map((product,index) => {
      return <div key={index}className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="flex items-end justify-end h-56 w-full bg-contain bg-no-repeat bg-center"  style={{ backgroundImage: `url(${product.imageCover})`}}>
            <button 
                 className="p-2 rounded-full bg-blue-600 text-white  hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                 onClick={()=> addProductToCart (product._id,userToken)}
                 >
                     <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                 </button>
            </div>
            <div className="px-5 py-3 text-white bg-slate-900">
            <Link to={"/ProductDetails/" + product._id}> <h3 className=" uppercase line-clamp-1">{product.title}</h3></Link>
            <span className="text-gray-300 mt-2">${product.price}</span>
            </div>
        </div>
   })}
    </div>
</div>
  )
}

import React, { useContext } from 'react'
import'./Products.css'
import RatingStars from '../Ratingstars/RatingStars';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { AuthContext } from '../../Context.jsx/AuthContext';
import axios from 'axios';
import { addProductToCart } from '../../cartService';

export default function Products({product}) {
let {userToken} = useContext(AuthContext)

  return (
    <>
    
    <div className="mx-auto grid  productcont">        
    <article className="rounded-xl p-2 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={"/ProductDetails/" +  product._id}><img src={product.imageCover} alt="product Photo" /></Link>
        </div>
      
        <div className="mt-1 p-2">
        <Link to={"/ProductDetails/" +  product._id}>
          <h2 className="text-slate-700 line-clamp-1">{product.title}</h2>
          </Link>
          <p className="mt-1 text-sm text-slate-400 line-clamp-2">{product.description}</p>
          <div className="mt-3 flex addbut items-end justify-between ">
             <p className="text-lg pricep font-bold text-blue-500">${product.price}</p>
              <RatingStars rating={product.ratingsAverage}/>
             
           {/* <span> <p className="bg-blue-100 ratp text-blue-800 text-sm font-semibold mr-1 px-2.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-1">{product.ratingsAverage}</p></span> */}
          
          </div>
         
          <div className="flex mt-4 mx-auto items-center w-fit justify-center rounded-lg bg-blue-500 text-center text-white duration-100 hover:bg-blue-600">
              <button 
              className="text-sm px-10 py-2" 
              onClick={()=> addProductToCart (product._id,userToken)}
                >Add to cart
                </button>
            </div>
        </div>
     
    </article>
      </div>
    </>
  )
}

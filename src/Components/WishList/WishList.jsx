import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
// import"./cart.css"
export default function Cart() {

  const [cart, setCart] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserCart()
  }, []);


  async function getUserCart(){
    setIsLoading(true)
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
      
      {
      headers:{
        token: localStorage.getItem("token")
    }
    }).finally(()=>{
      setIsLoading(false)
    })
    setCart(data);
  }

function ClearCart(){
 axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers:{
        token: localStorage.getItem("token")
      }
  }).finally(()=>{
    setCart(null)
  })
 
  }
if(isLoading){
  return <LoadingScreen/>
}
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

    {cart? <div className=" pt-10 mb-10 w-full">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {cart?.data.products.map((product,index) =>{
          return <CartProduct key={index} product={product} setCart={setCart}/>
        })
        }
      </div>
     
      <div className="mt-6 cartwid h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$0</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <Link to={"/shippingAddress/" + cart?.data._id} className="mt-6 block text-center w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      </div>
    </div>
    <button onClick={ClearCart} className="text-red-500 border-2 m-10 border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500 block mx-auto ">Clear Cart</button>
  </div> : <h1 className="text-center min-h-80 text-2xl flex items-center font-bold ">No Products in your cart</h1>}
  </>
  )
}

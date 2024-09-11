import axios from 'axios'
import React from 'react'
import Products from '../Products/Products';
import {Helmet} from "react-helmet";
import im1 from '/src/imgs/im1.png'
import im2 from '/src/imgs/im2.png'
import im3 from '/src/imgs/im3.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import"./home.css"
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function Home() {

   function getproduct() {
     return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }  

  let {data} = useQuery({
    queryKey:['products'],
    queryFn: getproduct,
 
  })


  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>



   {
            <>
            <div className="adds flex my-5 justify-center flex-wrap">
            <img src={im1} alt="#img" />
            <img src={im2} alt="#img" />
          </div>
          <div className="my-3">
          <img className="mx-auto" src={im3} alt="#img" />
          </div>
        
      
          <div className="App  bg-gray-900">
       
        </div>
   <div className="pr-5 pt-5  pl-5 flex gap-2 flex-wrap">
  
   {data?.data.data.map((product,i) => {
    return <Products product={product} key={i}/>
  })}
    </div>
    </> }
    </div>
    
  )
}


















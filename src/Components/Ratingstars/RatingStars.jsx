import React from 'react'
import { FaStar } from "react-icons/fa";
import './Ratingstars.css'
export default function RatingStars({rating}) {
  return (
    <>
      <div className=" ratediv flex items-center ">
                {[1,2,3,4,5].map((rate ,index) => {
                  return  <FaStar key={index} className={rating >= rate ? "text-yellow-400" : "text-gray-300"} />

                })}
               </div>
               <span> <p className="bg-blue-100 ratp text-blue-800 text-sm font-semibold mr-1 px-2.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-1">{rating}</p></span>
    </>
  )
}

import React from 'react'
import Slider from "react-slick";
export default function ProImgSlider({images,index}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <Slider {...settings}>
    {images?.map((img,index) => {
         return <img key={index} className="w-full object-contain rounded-md " src={img} alt="#img" />

    })}
   </Slider>
  
  )
}

import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cart from '../Cart/Cart';
import { useParams } from 'react-router-dom';
import"./ShippingAddress"
export default function ShippingAddress() {

    const {cartId} = useParams()


      const  validationSchema = Yup.object({
        city : Yup.string().required("city is required"),
        details : Yup.string().required("details is required"),
        phone : Yup.string().required("phone is required")
        })
    
        const [isLoading, setIsLoading] = useState(false);
    
        const initialValues = {
          "city":"",
          "phone":"",
          "details":""
        };
    
    
    let {   handleSubmit , values , handleChange , touched , handleBlur , errors } = useFormik({
      initialValues,
      onSubmit ,
      validationSchema
    })
    
    function onSubmit() {
        if (!cartId) {
          console.error("cartId is undefined");
          return;
        }
        setIsLoading(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, { shippingAddress: values }, {
          headers: {
            token: localStorage.getItem("token")
          },
          params: {
            url: 'http://localhost:3000'
          }
        }).then(({ data }) => {
          setIsLoading(false);
          location.href = data.session.url;
        }).catch((err) => {
          setIsLoading(false);
        });
      }
      
    
    
    return (
      <div className='min-h-screen flex  items-center w-full justify-center'>
      <div className="min-w-full md:w-1/2 lg:w-1/3 mx-auto shippingca  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Add your shipping Address </h1>
      <form action="#" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
       
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">City:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          {touched.city && errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          {touched.details && errors.details && <p className="text-red-500">{errors.details}</p>}
        </div>
        
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm  disabled:bg-slate-500" disabled={isLoading} >CheckOut {isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i> }</button>
       
      </form>
    </div>
      </div>
    )
    }
    
    
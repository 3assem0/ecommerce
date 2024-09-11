import { faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context.jsx/AuthContext';
import {Helmet} from "react-helmet";
import "./login.css";

export default function Login() {
  const  validationSchema = Yup.object({
    email : Yup.string().required("email is required").email("enter valid email"),
    password : Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"minimum 8 chars, at least 1 letter, 1 number and 2 special char"),
    })

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate()
    let {setUserToken} = useContext(AuthContext)

    const initialValues = {
      "email":"",
      "password":""
    };


let {   handleSubmit , values , handleChange , touched , handleBlur , errors } = useFormik({
  initialValues,
  onSubmit ,
  validationSchema
})

async function onSubmit() {
  setErrorMsg("")
  setIsLoading(true);
 await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({data})=>{
  setIsLoading(false)
  setUserToken(data.token);
  localStorage.setItem("token", data.token)
  navigate("/")
 }).catch((err) =>{
  setIsLoading(false)
  setErrorMsg(err.response.data.message)
 })
  
}


return (
  <>
  <Helmet>
  <title>Login</title>
</Helmet>
  <div className='min-h-screen  flex items-center min-w-full justify-center'>
  <div className="w-full md:w-1/2 lg:w-1/3 mx-auto loginscr   dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
  <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome </h1>
  <form action="#" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
   
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
      {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
    </div>

    <div className="flex items-start flex-col justify-start">
      <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
      <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
    {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
    </div>

    
    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm  disabled:bg-slate-500" disabled={isLoading} >Login {isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i> }</button>
    {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}
  </form>

  <div className="mt-4 text-center">
    <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
    <Link to={"/Register"} className="text-blue-500 hover:text-blue-600">Register</Link>
  </div>
</div>
  </div>
  </>
)
}


import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center ">
    <div className=" flex flex-col items-center justify-center pl-10 pr-10 ">
    <Outlet/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brand from './Components/Brand/Brand'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './Context.jsx/CounterContext'
import AuthContextProvider from './Context.jsx/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectAuthRoutes from './Components/ProtectAuthRoutes/ProtectAuthRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import { Offline} from "react-detect-offline";
import Sale from './Components/Sale/Sale'
import Categories from './Components/Categories/Categories'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import WishList from './Components/WishList/WishList'
function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '', element: <Layout/>, children: 
      [
          {index:true,element:<ProtectedRoute><Home/></ProtectedRoute> },
          {path:'e-commerce/',element:<ProtectedRoute><Home/></ProtectedRoute> },
          {path:'login',element: <ProtectAuthRoutes> <Login/> </ProtectAuthRoutes> },
          {path:'register',element:<ProtectAuthRoutes><Register/></ProtectAuthRoutes>},
          {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
          {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
          {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
          {path:'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
          {path:'ShippingAddress/:cartId',element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
          {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
          {path:'brand',element:<ProtectedRoute><Brand/></ProtectedRoute>},
          {path:'Sale',element:<ProtectedRoute><Sale/></ProtectedRoute>},
          {path:'*',element:<Notfound/>},
          // {index:true,element:<ProtectedRoute><Home/></ProtectedRoute> },
// {path:'HalaaBazaar-e-commerce/home',element:<ProtectedRoute><Home/></ProtectedRoute> },
// {path:'HalaaBazaar-e-commerce/login',element: <ProtectAuthRoutes> <Login/> </ProtectAuthRoutes> },
// {path:'HalaaBazaar-e-commerce/register',element:<ProtectAuthRoutes><Register/></ProtectAuthRoutes>},
// {path:'HalaaBazaar-e-commerce/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
// {path:'HalaaBazaar-e-commerce/products',element:<ProtectedRoute><Products/></ProtectedRoute>},
// {path:'HalaaBazaar-e-commerce/ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
// {path:'HalaaBazaar-e-commerce/ShippingAddress/:cartId',element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
// {path:'HalaaBazaar-e-commerce/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
// {path:'HalaaBazaar-e-commerce/brand',element:<ProtectedRoute><Brand/></ProtectedRoute>},
      ]
    }
  ])

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <CounterContextProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>
    <div className="fixed top-32 left-9 p-4 rounded-md bg-red-200"> 
      You are offline !
    </div>
    </Offline>
    </CounterContextProvider>
    </AuthContextProvider>  
    <ReactQueryDevtools/>
    </QueryClientProvider>
  
    </>
  )
}

export default App

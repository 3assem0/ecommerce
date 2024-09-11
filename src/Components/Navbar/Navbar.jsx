import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
import { AuthContext } from "../../Context.jsx/AuthContext";
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart  } from "react-icons/ci";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let {userToken ,setUserToken} = useContext(AuthContext)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


const navigate = useNavigate()
  function signOut(){
    setUserToken("")
    localStorage.removeItem("token")
    navigate('/login')
  }

  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', search);
  };
 

  return (
    <div>
      <nav className="bg-white p-10 border-b text-black w-full z-10">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="hover:cursor-pointer text-center ">
          <NavLink
              to={"/"}>
                <h1 className="navh min-w-36 text-xl">Halaa Bazaar</h1>
               <p className= "navb min-w-24"> Online Store</p>
            </NavLink>
          </div>

          <div className="lg:hidden ">
            <button
              onClick={toggleMenu}
              className=" focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

           <div
            className={`lg:flex flex-col lg:flex-row ${
              isOpen ? "block" : "hidden"
            } lg:space-x-4 lg:mt-0 innernavv mt-4 pt-2 flex flex-col items-center text-xl w-full`}
          >
           {userToken &&  <>
           <ul className="flex items-center justify-end gap-6 w-full ml-10">
              <li>
                <NavLink
                  to={"/"}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                {" "}
                <NavLink
                  to={"/categories"}
                 >
                  Categores
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/brand"}
                 >
                  Brands
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/Sale"}
                 >
                  Sale
                </NavLink>
              </li>

          
            </ul>
            <NavLink className=" carli font-bold flex items-center justify-center mr-5"
                 to={"/wishlist"}>
              
                 <CiHeart  className= "shopicon2 text-black"/>
               </NavLink>

                 <NavLink className=" carli  font-bold flex items-center justify-center mr-5"
                 to={"/cart"}>
              
                 <GiShoppingCart className= "shopicon text-black"/>
               </NavLink>
               </>
               }
            <div className="flex navlog items-center gap-4 ml-auto">
          
              <div className="flex gap-4">
                {!userToken && 
                <>
                <NavLink
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-black shadow"
                  to={"/login"}
                >
                  Login
                </NavLink>
                  <NavLink
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    to={"/register"}
                  >
                    Register
                  </NavLink>
                </>
                }

                   {userToken && <button
                    className="rounded-md signoutbtn px-5 py-2.5 text-sm font-medium  text-white "
                   onClick={signOut }
                  >
                    Signout
                  </button>}
              </div>
            </div>
          </div>
         
        </div>
      </nav>

      </div>
  );
}

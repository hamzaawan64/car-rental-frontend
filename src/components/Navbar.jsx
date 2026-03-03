import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'

const Navbar = () => {

  const {setShowLogin, user, logout, isOwner} = useAppContext()
  
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  


  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all
    ${location.pathname === "/" && "bg-light"}`}
    >
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8"
        />
      </Link>

      {/* Menu items */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} 
      ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"} `}
      >
        {menuLinks.map((link, index) => (
  <Link 
    to={link.path} 
    key={index}
    className={`relative pb-1 transition-all duration-200
      hover:text-primary
      after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary
      after:transition-all after:duration-300
      ${location.pathname === link.path 
        ? 'text-primary after:w-full' 
        : 'after:w-0 hover:after:w-full'
      }`}
  >
    {link.name}
  </Link>
))}

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        {/* buttons */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
  onClick={() => {
    isOwner ? navigate("/owner") : navigate("/apply-owner");
  }}
  className={`relative pb-1 transition-all duration-200
    hover:text-primary cursor-pointer
    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary
    after:transition-all after:duration-300
    ${location.pathname.startsWith('/owner') || location.pathname === '/apply-owner'
      ? 'text-primary after:w-full' 
      : 'after:w-0 hover:after:w-full'
    }`}
>
  {isOwner ? "Dashboard" : "List Your Car"}
</button>

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* aria-label button */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;



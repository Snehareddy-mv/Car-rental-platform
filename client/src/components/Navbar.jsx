import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {animate, motion} from 'motion/react'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {isOwner,setShowLogin,user,logout,axios,setIsOwner}=UseAppContext();

  
  const changeRole=async ()=>{
    try {
      const {data}=await axios.post('/api/owner/change-role')
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
      
    }
  }







  return (
    <motion.div
    initial={{opacity:0,y:-20}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.5}}

      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 border-b py-4 border-borderColor transition-all ${
        location.pathname === "/" && "bg-light"
      }  `}
    >
      <Link to="/">
        <motion.img 
        whileHover={{scale:1.2}}
        src={assets.logo} alt="logo" />
      </Link>
      <div
        className={`max-sm:fixed   max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor  right-0  max-sm:flex max-sm:flex-col relative sm:flex flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transistion-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        }  ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        <div className="hidden lg:flex items-center gap-2 border border-borderColor px-3 rounded-full max-w-52 text-sm">
          <input
            type="text"
            className="placeholder-gray-500 py-1.5 outline-none bg-transparent w-full"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>
        <div className="flex  max-sm:flex-col items-start sm:items-center gap-6 ">
          <button onClick={() => isOwner ? navigate("/owner"): changeRole()} className="cursor-pointer">
          { isOwner ? "Dashboard" :"List cars"}
          </button>

          <button
            onClick={() => {user ? logout() :setShowLogin(true)}}
            className="bg-primary hover:bg-primary-dull transition-all text-white rounded-lg px-8 py-2"
          >
            {user ? "Logout":"Login"}
          </button>
        </div>
      </div>


         <button className="sm:hidden cursor-pointer" aria-label="Menu" title="menu" onClick={()=>setOpen(!open)}>
          <img src={open? assets.close_icon : assets.menu_icon} alt="menu" />
         </button>

    </motion.div>
  );
};

export default Navbar;

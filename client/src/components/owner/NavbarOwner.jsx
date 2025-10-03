import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UseAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const {user,setUser}=UseAppContext();
  // const user = dummyUserData;
 
  return (
    <div className="flex items-center justify-between border-b border-borderColor px-6 md:px-10 py-4 transition-all relative">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      <p>Welcome,<span className="text-primary">{user?.name || "Owner"}</span></p>
    </div>
  );
};

export default NavbarOwner;

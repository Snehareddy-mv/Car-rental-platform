import React, { useState } from "react";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  // const user = dummyUserData;
  const { user, axios, fetchUser } = UseAppContext()

  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    // user.image = URL.createObjectURL(image);
    // setImage("");
    try {
      const formData = new FormData();
      formData.append("image", image)
      console.log("image", image)

      const { data } = await axios.post('/api/owner/update-image', formData)
      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  };

  return (
    <div className="relative  min-h-screen max-w-13 md:max-w-52 md:flex flex-col items-center w-full border-r border-borderColor pt-8">
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="w-9 h-9 rounded-full mx-auto md:h-14 md:w-14"
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                "https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg"
            }
            alt=""
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute top-0 right-0 left-0 bottom-0 rounded-full bg-black/10 group-hover:flex items-center justify-center hidden ">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex bg-primary/20 text-primary p-2 gap-1 cursor-pointer ">
          Save{" "}
          <img
            src={assets.check_icon}
            alt=""
            width={13}

          />
        </button>
      )}
      <p className="text-base mt-2 max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname
                ? "bg-primary/10 tex-primary"
                : "text-gray-600"
              }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt=""
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${link.path === location.pathname && "bg-primary"
                } w-1 h-10 rounded-lg right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


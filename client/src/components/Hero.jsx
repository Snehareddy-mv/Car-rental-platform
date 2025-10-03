import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    UseAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickUpLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center items-center gap-14 bg-light h-screen text-center"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl  max-sm:pt-[10rem] md:text-3xl font-semibold mt-7"
      >
        Luxury Cars on Rent
      </motion.h1>
      <motion.form
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="  flex flex-col bg-white  items-start md:flex-row md:items-center justify-between rounded-lg md:rounded-full p-6 w-full max-w-80 md:max-w-200 shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-9">
          <div className="flex flex-col items-start gap-3 ">
            <select
              required
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
            >
              <option>Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="ml-1">
              {pickUpLocation ? pickUpLocation : "Please select location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <label htmlFor="pickup-date">Pick-up-date</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
            />
          </div>

          <div className="flex flex-col items-start gap-3">
            <label htmlFor="return-date">Return-date</label>
            <input
              value={returnDate}
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-row bg-primary text-while items-center justify-center px-9 py-3 rounded-full cursor-pointer text-white gap-1 max-sm:mt-7 hover:bg-primary-dull"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className="max-h-74"
      />
    </motion.div>
  );
};

export default Hero;

import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center md:flex-row md:items-start justify-between bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] mx-3 md:mx-auto max-w-6xl overflow-hidden px-8 pt-10 min-md:pl-14 rounded-2xl"
    >
      <div className="text-white">
        <h2 className="text-3xl font-medium">Do you own a luxury car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-130 mt-2">
          We take care of insurance,driver verification and secure payments-so
          you earn passive income,stress-free
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-primary text-sm px-6 py-3 rounded-lg mt-10 cursor-pointer hover:bg-slate-100 mb-6"
        >
          List your car
        </motion.button>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="car"
        className="max-h-45 mt-10"
      />
    </motion.div>
  );
};

export default Banner;

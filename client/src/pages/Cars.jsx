import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
  const [input, setInput] = useState("");

  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = UseAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  const searchCarAvailablity = async () => {
    const { data } = await axios.post("/api/bookings/change-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No Available cars");
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailablity();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  return (
    <div>
      {/* first section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-light flex flex-col py-20 items-center max-md:px-4"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-full flex items-center px-4 max-w-140 shadow w-full mt-6 h-12"
        >
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-3" />
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search by make,model, or features"
            className="flex-1 outline-none text-gray-800 text-sm"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </motion.div>
      </motion.div>
      {/* second section:number of cars,carlist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-6 mt-20 md:px-16 lg:px-24 xl:px-32 gap-8"
      >
        <p className="font-medium mb-4 text-xl text-primary max-w-7xl mx-auto xl:px-20 ">
          Showing {filteredCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 max-w-7xl mx-auto xl:px-20">
          {filteredCars.map((car, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * index }}
              key={index}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;

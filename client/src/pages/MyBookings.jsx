import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, dummyMyBookingsData } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
 

 const {axios,currency,user}=UseAppContext();

  const fetchBookings = async () => {
    // setBookings(dummyMyBookingsData);
    try {
      const {data}=await axios.get('/api/bookings/user')
      if(data.success){
        setBookings(data.bookings)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  };


  

  // useEffect(() => {
  //   user && fetchBookings();
  // }, [user]);

  useEffect(() => {
  if (!user) return;

  fetchBookings(); // fetch first time

  const interval = setInterval(() => {
    fetchBookings(); // auto-refresh every 10 sec
  }, 10000);

  return () => clearInterval(interval); // clear when leaving page
}, [user]);


  return (
    <motion.div 
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.6}}
    className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-12 text-sm max-w-7xl">
      <Title
        title="My Bookings"
        subTitle="View and manage your car bookings"
        align="left"
        className="text-primary-dull"
      />

      <div>
        {bookings.map((booking, index) => (
          <motion.div
           initial={{opacity:0,y:20}}
           animate={{opacity:1,y:0}}
           transition={{duration:0.4,delay:0.1*index}}
            key={booking._id}
            className="grid grid-cols-1 border border-borderColor mt-10 p-6 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {/* car image and info */}
            <div className="md:col-span-1">
              <div className="rounded-md mb-3 overflow-hidden">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              <p className="mt-2 text-lg font-semibold">
                {booking.car.brand}
                {booking.car.model}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {booking.car.year}.{booking.car.category}.{booking.car.location}
              </p>
            </div>
            {/* Booking Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="bg-light rounded px-3 py-1.5">
                  Booking #{index + 1}
                </p>
                <p
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "confirmed"
                      ? "bg-green-400/15 text-[#06A764]"
                      : "bg-red-400/15 text-red-500"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-[#1F2937A6] text-sm">Rental Period</p>
                  <p className="font-medium mt-1">
                    {booking.pickupDate.split("T")[0]} -{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-3">
                <img
                  src={assets.location_icon_colored}
                  alt=""
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-[#1F2937A6] text-sm">Pick-up Location</p>
                  <p className="font-medium mt-1">{booking.car.location}</p>
                </div>
              </div>

              {/* <div className="flex items-start gap-3 mt-3">
                      <img src={assets.location_icon_colored} alt="" className="w-4 h-4 mt-1" />
                      <div>
                        <p  className="text-[#1F2937A6] text-sm">Return Location</p>
                        <p className="font-medium mt-1">{booking.car.location}</p>
                      </div>
                    </div> */}
            </div>

            {/* price */}
            <div className="md:col-span-1 flex flex-col  justify-between gap-6 ">
              <div className="text-gray-500  text-sm text-right flex flex-col gap-1 ">
                <p>Total Price</p>
                <h1 className="text-primary font-semibold text-2xl">
                  {currency}
                  {booking.price}
                </h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>
            </div>

            
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;

import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/Title";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
 
  const {axios,currency,isOwner}=UseAppContext()
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    // setBookings(dummyMyBookingsData);

    try {
      const {data}=await axios.get('/api/bookings/owner')
      console.log("API Response:", data); // ✅ log API response
      if(data.success){
        setBookings(data.bookings)
         console.log("Bookings set in state:", data.bookings);
      }
      else{
        toast.error(data.message)
      }
      
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };



  const changeBookingStatus=async(bookingId,status)=>{
    try {
      const {data}=await axios.post('/api/bookings/change-status',{bookingId,status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }
      else{
        toast.error(error.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
   isOwner && fetchOwnerBookings();
  }, [isOwner]);





  return (
    <div className="px-4  md:px-10 w-full pt-10">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
        align="left"
      />

      {/* table */}
      <div className="border border-borderColor max-w-3xl w-full mt-10 overflow-hidden rounded-md">
        <table className="w-full border-collapse  text-sm text-gray-600 text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-borderColor text-gray-500"
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="w-12 h-12 aspect-square object-cover rounded-md"
                  />
                  <p className="font-medium max-md:hidden">
                    {booking.car.brand}
                    {booking.car.model}
                  </p>
                </td>
                <td className="p-3 max-md:hidden">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                <td className="p-3">
                  {currency}
                  {booking.price}
                </td>

                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 text-xs rounded-full px-3 py-1 ">
                    Offline
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <select
                      className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                      value={booking.status}
                      onChange={(e)=>changeBookingStatus(booking._id,e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;

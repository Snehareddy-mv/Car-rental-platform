import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyCarData } from "../../assets/assets";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { axios, currency, isOwner } = UseAppContext();

  const [car, setCar] = useState([]);

  const fetchOwnerCars = async () => {
    // setCar(dummyCarData);
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCar(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar=async(carId)=>{
    try {
      const confirm=window.confirm("Are you sure you want to delete this car?")
      if(!confirm) return null
      const {data}=await axios.post('/api/owner/delete-car',{carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }

    } catch (error) {
      toast.error(error.message)
      
    }
  }











  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, []);

  return (
    <div className="px-4  md:px-10 w-full pt-10">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
        align="left"
      />

      {/* table */}
      <div className="border border-borderColor max-w-3xl w-full mt-10 overflow-hidden rounded-md">
        <table className="w-full border-collapse  text-sm text-gray-600 text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {car.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={car.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-md aspect-square"
                  />
                  <div>
                    <p className="font-medium">
                      {car.brand}
                      {car.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {car.seating_capacity}··{car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{car.category}</td>

                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>
                <td className="p-3 max-md:hidden">
                  <span
                    className={`text-xs px-3 py-1 rounded-2xl cursor-pointer ${
                      car.isAvaliable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {car.isAvaliable ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="flex items-center p-3">
                  <img
                   onClick={()=>toggleAvailability(car._id)}
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt=""
                    className="cursor-pointer"
                    
                  />
                  <img
                  onClick={()=>deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt=""
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;

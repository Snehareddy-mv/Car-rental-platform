import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCars = () => {
  const [image, setImage] = useState(null);
  const { axios, currency, navigate } = UseAppContext();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        align="left"
      />
      <form
        className="flex flex-col gap-5 max-w-xl text-sm text-gray-500 mt-6 "
        onSubmit={onSubmitHandler}
      >
        {/* car image */}
        <div className="flex items-center gap-3 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-16 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p>Upload a picture of your car</p>
        </div>

        {/* car brand and model */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              required
              placeholder="e.g.BMW,Mercedes,Audi..."
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              required
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              value={car.model}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              placeholder="e.g.X5,E-Class,M4..."
            />
          </div>
        </div>

        {/* year,price,category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full ">
            <label>Year</label>
            <input
              type="number"
              required
              placeholder="2025"
              value={car.year}
              className="border border-borderColor px-3 py-2 mt-1 rounded-md outline-none"
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full ">
            <label>Daily Price {currency}</label>
            <input
              type="number"
              required
              placeholder="100"
              value={car.pricePerDay}
              className="border border-borderColor px-3 py-2 mt-1 rounded-md outline-none"
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full ">
            <label>Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="border border-borderColor px-3 py-2 mt-1 rounded-md outline-none"
            >
              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* transmission,fuel type,seating capacity */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              required
              className="px-3 py-2 border border-borderColor rounded-md mt-1 outline-none "
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="SemiAutomatic">SemiAutomatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              required
            >
              <option value="">Select a Fuel Type</option>
              {/* <option value="Gas">Gas</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option> */}
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG (Compressed Natural Gas)</option>
              <option value="LPG">LPG (Liquefied Petroleum Gas)</option>
              <option value="Electric">Electric (EV)</option>
              <option value="Hybrid">Hybrid (Petrol + Electric)</option>
              <option value="Flex-Fuel">Flex-Fuel (Ethanol blends)</option>
              <option value="Hydrogen">Hydrogen Fuel Cell (future tech)</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md"
            />
          </div>
        </div>

        {/* location */}

        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            required
          >
            <option value="">Select a Location</option>
            {/* <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houstan">Houstan</option>
            <option value="Chicago">Chicago</option> */}
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </div>

        {/* description */}

        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="Describe your car,its condition,and any notable details..."
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="bg-primary text-white w-max flex items-center gap-2 rounded px-3 py-2 mt-2 cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing....." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCars;

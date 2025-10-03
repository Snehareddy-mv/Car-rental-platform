import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Cars from "./pages/Cars";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import AddCars from "./pages/owner/AddCars";
import Dashboard from "./pages/owner/Dashboard";
import ManageBookings from "./pages/owner/ManageBookings";
import ManageCars from "./pages/owner/ManageCars";
import Login from "./components/Login";
import  { Toaster } from 'react-hot-toast';
import { UseAppContext } from "./context/AppContext";

const App = () => {
  
  const isOwnerpath = useLocation().pathname.startsWith("/owner");

  const {showLogin}=UseAppContext()

  return (
    <>
      <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerpath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-cars" element={<ManageCars />} />
        </Route>
      </Routes>
      {!isOwnerpath && <Footer />}
    </>
  );
};

export default App;

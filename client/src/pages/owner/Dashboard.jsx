import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyDashboardData } from "../../assets/assets";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const {isOwner,axios,navigate,currency}=UseAppContext();
 
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  // useEffect(() => {
  //   setData(dummyDashboardData);
  // }, []);

const fetchDashboardData=async()=>{
  try {
    const {data}=await axios.get('/api/owner/dashboard')
    if(data.success){
      setData(data.dashboardData)
    }
    else{
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
    
  }
  
}

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
    }
  },[isOwner])

  return (
    <div className="pt-10 px-4 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        align="left"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 w-full">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="border border-borderColor flex items-center justify-between rounded-md p-4 w-full gap-2"
          >
            <div>
              <h1 className="text-sm text-[#6B7280] whitespace-nowrap">
                {card.title}
              </h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="rounded-full bg-primary/10 flex items-center justify-center w-10 h-10">
              <img src={card.icon} alt="" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      {/* second section:recent bookings and revenue */}
      <div className="flex flex-wrap mb-8 gap-4 items-start">
        {/* recent bookings */}
        <div className="border border-borderColor p-4 md:p-6 rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-sm text-[#64748B]">Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 font-medium">
                <div className="bg-primary/10 w-12 h-12 rounded-full hidden md:flex items-center justify-center">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <div>
                  <p className="text-base">
                    {booking.car.brand} {booking.car.model}{" "}
                  </p>
                  <p className="text-[#64748B] text-sm font-normal mt-1">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-[#64748B] text-sm">
                  {currency}
                  {booking.price}
                </p>
                <p className="border border-borderColor px-3 py-0.5 text-sm rounded-full">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* revenue */}
        <div className="border border-borderColor p-4 md:p-6 rounded-md max-sm:mt-4 w-full md:max-w-xs  mb-6 ">
          <h1 className="font-medium text-lg">Monthly Revenue</h1>
          <p className="text-sm text-[#64748B]">Revenue for current month</p>
          <p className="text-primary font-semibold text-3xl mt-6">{currency}{data.monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

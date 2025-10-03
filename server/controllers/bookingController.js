import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// function for checking availability of cars to book
export const checkAvailability=async(car,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate}
    })

    //if it returns true means its already booked then 

     return bookings.length === 0;
  
}


//api  to check availability of cars for the given date and location

export const checkAvailabilityOfCar=async(req,res)=>{
    try {
        const {location,pickupDate,returnDate}=req.body

        //fetch all the available cars for the given location
        const cars=await Car.find({location,isAvaliable:true})

        //check car availabilty for the given date range using .promise

        const availableCarsPromises=cars.map(async(car)=>{
          const isAvailable=  await checkAvailability(car._id,pickupDate,returnDate)
             return {...car._doc,isAvailable:isAvailable}
        })

        let availableCars=await Promise.all(availableCarsPromises);
        availableCars=availableCars.filter(car=>car.isAvailable===true)

        return res.json({success:true,availableCars})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})

        
    }
}

//api to create booking

export const createBooking=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {car,pickupDate,returnDate}=req.body;

        const isAvailable=await checkAvailability(car,pickupDate,returnDate)
        if(!isAvailable){
            return res.json({success:false,message:"Car is not available"})
        }

        const carData=await Car.findById(car)

        //calculate  price based on pickupDate and returnDate
        const picked=new Date(pickupDate);
        const returned=new Date(returnDate);

        const noOfDays=Math.ceil((returned-picked)/(1000*60*60*24))
        const price=carData.pricePerDay*noOfDays;

        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})

        return res.json({success:true,message:"Booking Created"})

    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}

//Api to list user bookings
export const getUserBookings=async(req,res)=>{
    try {
        const {_id}=req.user;
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
         

        return res.json({success:true,bookings})

        
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}

//api to get owner bookings

export const getOwnerBookings=async(req,res)=>{
    try {
      if(req.user.role !== "owner"){
        return res.json({success:false,message:"Not Authorized"});
      }
      const bookings=await Booking.find({owner:req.user._id}).populate("car user").select('-user.password').sort({createdAt:-1})
      return res.json({success:true,bookings})

        
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}

//api to change the booking status ...when a booking is created its status will be pending..so then owner can update it by confirming or cancelling booking

export const changeBookingStatus=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {bookingId,status}=req.body;

        const booking=await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success:false,message:"Not Authorized"})
        }

        booking.status=status;
        await booking.save();

        return res.json({success:true,message:"Status updated"})
        
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}
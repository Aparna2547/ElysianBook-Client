import React from 'react'
import Navbar from "../User/NavBar/Navbar"
// import {successBooking} from "../../../public/bookingSuccessfull.jpeg"
import {Link} from 'react-router-dom'

const BookingSuccess = () => {
  return (
    <div className='block'>
        <div>
        <Navbar/>
        </div>
    <div className='bg-red-100 mt-4 h-screen block'>
        <h1 className='text-black'>ekkdnskdfnkn</h1>
        <br />
       
            <div className=' flex justify-center items-center lg:mt-10 mt-20'>
            <img src='public/bookingSuccessfull.jpeg'alt="photo" className='h-72 w-w-75 shadow-sm rounded-bl-lg' />
            </div>
            <h1 className='text-center font-bold text-lg mt-4'>Your Appointment has been booked successfully</h1>
            <div className='flex justify-center items-center mt-5'>
            <button className='bg-red-600 rounded text-white px-4 py-2 '><Link to={'/viewBookings'}>View Bookings</Link></button>
            </div>
    </div>
    
    </div>
  )
}

export default BookingSuccess
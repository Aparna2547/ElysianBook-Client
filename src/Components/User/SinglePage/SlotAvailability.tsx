import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import {bookedSlots} from "../../../Api/user"

interface bookingProps{
  bookingDetails:{
    date:string,
    startingTime:number,
    closingTime:number,
    seatNo:number,

  }
  setBookingDetails:(data:object)=>void;
  convertTo12HourFormat:()=>void
}



const SlotAvailability = ({bookingDetails,setBookingDetails,convertTo12HourFormat}:bookingProps) => {
  const [date,setDate] = useState()
  const [time,setTime] =useState()
  const [slots,setSlots] = useState([])

  const {id} = useParams()

  const today = new Date();

  useEffect(() => {
    const fetchSlots = async () => {
      console.log('idl', id);
      console.log('ksgd', bookingDetails.date);
      
      const selectedDate = new Date(bookingDetails.date);
      
      // Add one day to the selected date
      selectedDate.setDate(selectedDate.getDate() + 1);
      
      // Format the updated date to ISO string
      const formattedDate = selectedDate.toISOString();
      console.log(formattedDate);
      
      const res = await bookedSlots(id as string, formattedDate);
      console.log(res.data.data);
      setSlots(res.data.data)
    };
  
    fetchSlots();
  }, [id, bookingDetails.date]);
  


// Subtract one day from today's date to get yesterday's date
const startDate = new Date(today);
startDate.setDate(today.getDate() + 1);

const endDate = new Date(today)
endDate.setDate(today.getDate()+7)
  return ( 
    <div className=" p-2 w-full text-black lg:flex lg:flex-nowrap ">
        <div className='bg-white text-black flex-col justify-center'>
            <Calendar 
            value={bookingDetails.date}
            onChange={(date) => setBookingDetails({...bookingDetails, date})}
           minDate = {startDate}
           maxDate={endDate}
            />
            <div  className='mt-2 w-full'>
                <input type="time" className='w-full' 
                value={bookingDetails.startingTime}
                onChange={(e)=>setBookingDetails({...bookingDetails,startingTime:e.target.value})}
                min={bookingDetails.startingTime}
                max={bookingDetails.closingTime}

                 />
            </div>
        </div>
        <div   className='block'>
            <h1 className='text-center font-bold '>Booked slots</h1>
            <div className='mx-5 flex gap-10 p-5 flex-wrap text-center'>
              
          {slots.length>0 ? slots.map((slot, index) => (
            <div key={index} className='block '>
              <h1 className=''>Seat {slot.seatNo}</h1>
              {slot.bookings.reverse().map((booking, bookingIndex) => (
                <p key={bookingIndex} className='text-xs text-nowrap mt-1 bg-gray-500 text-white p-1 rounded'>
                 {convertTo12HourFormat(booking.startingTime)} - {convertTo12HourFormat(booking.endingTime)}
                </p>
              ))}
            </div>
          )):
          <div>No Booked slots</div>
          }
        </div>



        {/* <div className='mx-5 flex gap-10 p-5 flex-wrap text-center'>
           <div className='block '>
           <h1 className=''> Seat 1</h1>
            <p className='text-xs text-nowrap bg-gray-700 text-white p-1 rounded '>10.00 AM - 11.00 AM</p>
           </div>
        </div> */}
        </div>
    </div>
  )
}

export default SlotAvailability
import React,{useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

interface bookingProps{
  bookingDetails:object;
  setBookingDetails:(data:object)=>void;

}

const SlotAvailability = ({bookingDetails,setBookingDetails}:bookingProps) => {
  const [date,setDate] = useState()
  const [time,setTime] =useState()

  const today = new Date();

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
                value={bookingDetails.startTime}
                onChange={(e)=>setBookingDetails({...bookingDetails,startTime:e.target.value})}
                 />
            </div>
        </div>
        <div   className='block'>
            <h1 className='text-center font-bold'>Booked slots</h1>
        <div className='mx-5 flex gap-10 p-5 flex-wrap text-center'>
           <div className='block '>
           <h1 className=''> Seat 1</h1>
            <p className='text-xs text-nowrap bg-gray-700 text-white p-1 rounded '>10.00 AM - 11.00 AM</p>
           </div>
           <div className='block'>
           <h1> Seat 1</h1>
           <p className='text-xs text-nowrap'>10.00 AM - 11.00 AM</p>
           </div>
           <div className='block'>
           <h1> Seat 1</h1>
           <p className='text-xs text-nowrap'>10.00 AM - 11.00 AM</p>
           </div>
           <div className='block'>
           <h1> Seat 1</h1>
           <p className='text-xs text-nowrap'>10.00 AM - 11.00 AM</p>
           </div>
           <div className='block'>
           <h1> Seat 1</h1>
           <p className='text-xs text-nowrap'>10.00 AM - 11.00 AM</p>
           </div>
           <div className='block'>
           <h1> Seat 1</h1>
           <p className='text-xs text-nowrap'>10.00 AM - 11.00 AM</p>    
           </div>
        </div>
        </div>
    </div>
  )
}

export default SlotAvailability
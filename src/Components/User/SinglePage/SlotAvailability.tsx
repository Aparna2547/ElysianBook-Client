import {useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import {bookedSlots} from "../../../Api/user"
import {toast} from 'react-toastify'
interface bookingProps{
  bookingDetails:{
    date:string,
    startingTime:string,
    closingTime:string,
    seatNo:number,

  }
  setBookingDetails:any

  // setBookingDetails: (data: {   date: string; startingTime: string; closingTime: string; seatNo: number ; serviceName:string }) => void;
  convertTo12HourFormat:any,
  openingTime:string,
  closingTime:string
}


interface Slots{
  seatNo:number,
  bookings:[
    startTime:string,
  endTime:string
  ],
  
}

const SlotAvailability = ({bookingDetails,setBookingDetails,convertTo12HourFormat,openingTime,closingTime}:bookingProps) => {
  const [slots,setSlots] = useState<Slots[]>([])

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
      console.log('helo jab',res.data.data);
      if(res.data.data.holiday.length >0){
        toast.error('Parlour is closed on this day. Please choose other dates.')
      }else{
        setSlots(res.data.data.data)

      }
      
    };
  
    fetchSlots();
  }, [id, bookingDetails.date]);
  


// Subtract one day from today's date to get yesterday's date
const startDate = new Date(today);
startDate.setDate(today.getDate() + 1);

const endDate = new Date(today)
endDate.setDate(today.getDate()+7)

const handleTime  = async (e:any) =>{
  const selectedTime = e.target.value
  if(selectedTime < openingTime || selectedTime > closingTime){
    toast.error('Parlour is closed')
  }else{
    setBookingDetails({...bookingDetails, startingTime:selectedTime})
  }
}

  return ( 
    <div className=" p-2 w-full text-black lg:flex lg:flex-nowrap ">
        <div className='bg-white text-black flex-col justify-center'>
            <Calendar 
            value={bookingDetails.date}
            onChange={(date) => setBookingDetails({...bookingDetails, date})}
           minDate = {startDate}
           maxDate={endDate}
            />
          <div className='mt-2 w-full'>
    <input 
        type="time" 
        className='w-full' 
        value={bookingDetails.startingTime}
        // value={bookingDetails.startingTime < openingTime? toast.error('shop is not opened')|| bookingDetails.startingTime >closingTime ? toast.error("parlour is closed"): bookingDetails.startingTime }
        // onChange={(e) => setBookingDetails({...bookingDetails, startingTime: e.target.value})}
        onChange={handleTime}
        
    
    />
</div>

            
        </div>
        <div   className='block'>
            <h1 className='text-center font-bold '>Booked slots</h1>
            <div className='mx-5 flex gap-10 p-5 flex-wrap text-center'>
              
          {slots.length>0 ? slots.map((slot, index) => (
            <div key={index} className='block '>
              <h1 className=''>Seat {slot.seatNo}</h1>
              {slot.bookings.reverse().map((booking:any, bookingIndex) => (
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
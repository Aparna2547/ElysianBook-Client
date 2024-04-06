import React,{useState,useEffect} from 'react'
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar'
import { allBookings } from '../../../Api/parlour'
import Pagination from "../../../Components/Parlour/Pagination"

const Bookings = () => {
  const [bookings,setBookings] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)

  useEffect(()=>{
    const fetchBookings = async() =>{
      const res = await allBookings(currentPage)
      console.log(res.data.data.bookingDetails)
      setBookings(res.data.data.bookingDetails)
      setTotalPages(res.data.data.totalPages)
    }
    fetchBookings()
  },[currentPage])
  return (
    
  <div className='flex'>
    <div>
<Sidebar/>
    </div>

    <div className='w-full'>
      <div className='font-bold text-lg m-5'>
        All Bookings
      </div>
    <div className='block w-full '>
       {bookings && bookings.reverse().map((booking)=>(
 <div className='border border-gray-400 rounded mt-3 p-3 mx-10'>
 <h1 className='text-sm mb-2 font-bold'>BKD{booking._id} <b> </b>
 <hr />
</h1>
 <div className='flex gap-10 justify-between mt-2'>
    <div className='flex'>
    <div className='me-3'>
         <img alt="image" src={booking.parlourId.banners[0]} className='w-32 h-20 rounded'/>
     </div>
     <div className='block mx-4'>
     <h1 className='text-md font-bold'>{booking.parlourId.parlourName}</h1>
     <h1 className='text-sm' >{booking.parlourId.locality}</h1>
     </div>
    </div>
     <div className='ms-2'>
        USER DETAILS
     <h1 className='text-sm font-bold'>{booking.userId.name}</h1>
     <div className='flex gap-2'>
<h1 className='text-sm'> booking date:</h1>
<h1 className='text-sm font-bold'>
  {new Date(booking.date).toISOString().split('T')[0]}

  </h1>
     </div>
     <div className='flex gap-2'>
<h1 className='text-sm'> booking time:</h1>
<h1 className='text-sm font-bold'>
  {booking.startingTime} to {booking.endingTime}
  </h1>
     </div>
     <div className='flex gap-2'>
<h1 className='text-sm'>Status: <b>{booking.status}</b></h1>
     </div>
     </div>
 </div>
 {booking.status==='cancelled' &&
 <div>
 <h1>Reason: <b>{booking.cancelReason}</b></h1>
</div>
 }
 
</div>
       ))}
      
      </div>
      <Pagination
   currentPage={currentPage}
   setCurrentPage={setCurrentPage}
   totalPages={totalPages}
 />   
    </div>
   
  </div>   
 
  )
}

export default Bookings
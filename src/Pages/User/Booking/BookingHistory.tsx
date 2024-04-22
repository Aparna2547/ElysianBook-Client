import {useState,useEffect} from 'react'
import ViewBooking from "../../../Components/User/ViewBooking"
import {allUserBookings } from '../../../Api/user'
import CancelModal from '../../../Components/User/CancelModal';
import NavBar from "../../../Components/User/NavBar/Navbar"
import NoBookings from "../../../Components/NoBookings/NoBookings"
type bookingDetails ={
    _id:string;
    date: string; 
    startingTime: string;
    endingTime: string;
    status:string;
    parlourId: {
        parlourName: string;
        banners: string[]; 
        locality: string;
    };
    userId:{
        name:string
    },
    cancelReason:string
    
}

const BookingHistory = () => {
    const [modal,setModal] = useState(false)
    const [bookings,setBookings] =  useState<bookingDetails[]>([])
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(0)
    const [selectedBookingId,setSelectedBookingId] = useState('')

    const [cancelModal,setCancelModal] = useState(false)

    useEffect(()=>{
        const fetchBookings  = async () =>{
          console.log(currentPage)
            const res = await allUserBookings(currentPage)
            console.log(res.data.data)
            setBookings(res.data.data.bookingDetails)
            setTotalPages(res.data.data.totalPages)
        } 
        fetchBookings()
    },[cancelModal,currentPage])


    const handleCancelClick = (bookingId:string) => {
      console.log('bookingId',bookingId)
      setSelectedBookingId(bookingId);
      setCancelModal(true);
  };


  return (
    <>
    <NavBar/>
    {bookings.length > 0 ?(
  <div className='block w-full '>
  { bookings.map((booking)=>(
<div className='border border-gray-400 mt-5 p-3 mx-10'>
<h1 className='text-sm mb-1'>orderId : <b>  {`ORD${booking._id}`}</b>
</h1>
<div className='flex gap-10 justify-between'>
<div className='flex'>
<div className='me-3'>
   <img src={booking.parlourId.banners[0]} alt="image" className='w-32 h-20 rounded'/>
</div>
<div className='block mx-4'>
<h1 className='text-md font-bold'>{booking.parlourId.parlourName}</h1>
<h1 className='text-sm'>{booking.parlourId.locality}</h1>
{booking.status!=='cancelled' ?
<div className='flex mt-2'>
<button className='bg-red-600 px-2 py-1 rounded font-bold text-xs text-white' onClick={() => handleCancelClick(booking._id)}>Cancel</button>
</div>:
<div className=' mt-2'>
<div className='bg-red-600 px-2 py-1 w-20 rounded font-bold text-xs text-white'>Cancelled</div>
<div className='flex' >Reason: {booking.cancelReason} </div>
</div>
}

</div>
</div>
<div className='ms-2'>
  USER DETAILS
<h1 className='text-sm font-bold'>{booking.userId.name}</h1>
<div className='flex gap-2'>
<h1 className='text-sm'> booking date:</h1>
<h1 className='text-sm font-bold'>{new Date(booking.date).toISOString().split('T')[0]}</h1>
</div>
<div className='flex gap-2'>
<h1 className='text-sm'> booking time:</h1>
<h1 className='text-sm font-bold'>{booking.startingTime} to {booking.endingTime}</h1>
</div>
<div className='flex gap-2'>
<h1 className='text-sm'>Status:</h1>
<h1 className='text-sm font-bold'>{booking.status} </h1>
</div>
</div>
</div>

{/* <button className='flex justify-between font-bold text-sm' >view services<FaArrowRight className='mt-2 ms-2 text-sm'/></button> */}
</div>
  ))}

  
<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        href="#"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </a>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center justify-end">
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p
            aria-current="page"
            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {currentPage}
          </p>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={totalPages == currentPage}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
 
</div>
    ):(
      <div><NoBookings/></div>
    )}
  
    {cancelModal &&<CancelModal  setCancelModal={setCancelModal}  bookingId={selectedBookingId}/>}

    {modal && <ViewBooking setModal={setModal} />} 

        
    </>
  )
}

export default BookingHistory
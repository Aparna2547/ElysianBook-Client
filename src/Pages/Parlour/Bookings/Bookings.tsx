import  { useState, useEffect } from "react";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import { allBookings } from "../../../Api/parlour";
import Pagination from "../../../Components/Parlour/Pagination";
import CancelBooking from "../../../Components/Parlour/CancelBooking"
import Loading from "../../../Components/Loading/Loading"

type Bookingtypes = {
  _id: string;
  parlourId: {
    banners: string;
    parlourName: string;
    locality: string;
  };
  userId: {
    name: string;
  };
  date: string;
  startingTime: number;
  endingTime: number;
  status: string;
  cancelReason: string;
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Bookingtypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [cancelModal,setCancelModal] = useState(false)
  const [selectedBookingId,setSelectedBookingId] = useState<string>('')

  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchBookings = async () => {
      const res = await allBookings(currentPage);
      console.log(res.data.data.bookingDetails);
      setBookings(res.data.data.bookingDetails);
      setTotalPages(res.data.data.totalPages);
      setLoading(false)
    };
    fetchBookings();
  }, [currentPage]);

  const handleCancelClick = (bookingId:string) =>{
    console.log('kasdk',bookingId)
    setSelectedBookingId(bookingId)
    setCancelModal(true)
  }
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

    {loading ?(
      <div className="flex justify-center items-center">
      <Loading/>
      </div>
    ):(
<div className="w-full overflow-y-scroll">
        <div className="font-bold text-lg m-5">All Bookings</div>
        <div className="block w-full ">
          {bookings &&
            bookings.reverse().map((booking) => (
              <div className="border border-gray-400 rounded mt-3 p-3 mx-10">
                <h1 className="text-sm mb-2 font-bold">
                  BKD{booking._id} <b> </b>
                  <hr />
                </h1>
                <div className="flex gap-10 justify-between mt-2">
                  <div className="flex">
                    <div className="me-3">
                      <img
                        alt="image"
                        src={booking.parlourId.banners[0]}
                        className="w-32 h-20 rounded"
                      />
                    </div>
                    <div className="block mx-4">
                      <h1 className="text-md font-bold">
                        {booking.parlourId.parlourName}
                      </h1>
                      <h1 className="text-sm">{booking.parlourId.locality}</h1>
                      {booking.status === 'cancelled' || booking.status === 'cancelledByParlour' ?
                      <div className="text-red-700 font-bold mt-2">cancelled</div>

                      :
                      <button className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold mt-2" onClick={()=>handleCancelClick(booking._id)}>CANCEL</button>

                      }
                    </div>
                  </div>
                  <div className="ms-2">
                    USER DETAILS
                    <h1 className="text-sm font-bold">{booking.userId.name}</h1>
                    <div className="flex gap-2">
                      <h1 className="text-sm"> booking date:</h1>
                      <h1 className="text-sm font-bold">
                        {new Date(booking.date).toISOString().split("T")[0]}
                      </h1>
                    </div>
                    <div className="flex gap-2">
                      <h1 className="text-sm"> booking time:</h1>
                      <h1 className="text-sm font-bold">
                        {booking.startingTime} to {booking.endingTime}
                      </h1>
                    </div>
                    <div className="flex gap-2">
                      <h1 className="text-sm">
                        Status: <b>{booking.status}</b>
                      </h1>
                    </div>
                  </div>
                </div>
                {booking.status === "cancelled"|| booking.status === "cancelledByParlour" && (
                  <div>
                    <h1>
                      Reason: <b>{booking.cancelReason}</b>
                    </h1>
                  </div>
                )}
              </div>
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    )}
      
    {cancelModal && <CancelBooking setCancelModal={setCancelModal} bookingId={selectedBookingId}/>}

    </div>

  );
};

export default Bookings;

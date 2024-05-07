import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import Scrollbar from "../SinglePage/Scrollbar";
import { getAllServices, proceedForPayment } from "../../../Api/user";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'sonner'
import {loadStripe} from "@stripe/stripe-js"


// interface Booking {
//   date: string;
//   startingTime: string;
//   closingTime?: string;
//   seatNo?: number;
//   services: ServiceProps[];
//   totalDuration: number;
//   totalPrice: number;
//   endingTime: string;
// }


interface bookingProps {
  closingTime:string
  bookingDetails:any,
  convertTo12HourFormat:any
    setBookingDetails: any;

  // setBookingDetails: (data: object) => void;
  // setBookingDetails: (data: { date: string; startingTime: string; closingTime: string; seatNo: number; serviceName: string; }) => void;
}

type ServiceProps = {
  serviceName: string;
  duration: number;
  price: number;
  image: string;
  description: string;
  category:string;
};


const Services = ({ bookingDetails, setBookingDetails ,convertTo12HourFormat,closingTime}: bookingProps) => {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const { id } = useParams<{ id: any }>();
  const [categorySelected, setCategorySelected] = useState<ServiceProps[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceProps[]>([]);



  useEffect(() => {
    const fetchServices = async () => {
      const res = await getAllServices(id as string);

      setServices(res.data.data);
      setCategorySelected(res.data.data[0].services);
    };
    fetchServices();
  }, []);


  //pushing selectedservices
  const handleSelectedServices = async (service: ServiceProps) => {
    const isAlreadySelected = selectedServices.some(
      (s) => s.serviceName  === service.serviceName
    );
    if (!isAlreadySelected) {
      if (!bookingDetails.startingTime) {
        return toast.error("Please select date and time");
      }
      
      

      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        service,
      ]);

      let serviceSelected = [...selectedServices, service];

      const totalTime = serviceSelected.reduce(
        (acc, service) => acc + service.duration,
        0
      );
      const totalPrice = serviceSelected.reduce(
        (acc, service) => acc + service.price,
        0
      );

      const endingTime = calculateEndingTime(
        bookingDetails.startingTime,
        totalTime
      );

      setBookingDetails({
        ...bookingDetails,
        services: serviceSelected,
        totalDuration: totalTime,
        totalPrice,
        endingTime,
      });
    }
  };

  //delete services
  const handleDelete = async (index: number) => {
    setSelectedServices((prevSelectedServices) => {
      const updatedServices = prevSelectedServices.filter((_, i) => i !== index);
      return updatedServices;
    });
  
  };

  //calculating ending time
  function calculateEndingTime(startingTime: string, totalDuration: number) {
    const [startHours, startMinutes] = startingTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    startDate.setMinutes(startDate.getMinutes() + totalDuration);

    const endingHours = startDate.getHours().toString().padStart(2, "0");
    const endingMinutes = startDate.getMinutes().toString().padStart(2, "0");
    const endingTime = `${endingHours}:${endingMinutes}`;

    return endingTime;
  }



  //calculating total time and service
  const calculateTotal = () => {
    const totalTime = selectedServices.reduce(
      (acc, service) => acc + service.duration,
      0
    );
    const totalPrice = selectedServices.reduce(
      (acc, service) => acc + service.price +100,
      0
    );

    return { totalTime, totalPrice };
  };
  const { totalTime, totalPrice } = calculateTotal();
  const endingTime = calculateEndingTime(bookingDetails.startingTime,totalTime)





  //booking services
  const handleBooking = async () => {

    if(endingTime>closingTime){
      toast.error(`parlour will close ${closingTime}`)
    }
    else{
      const stripe = await loadStripe(import.meta.env.VITE_APP_LOADSTRIPE  )
      
       
      const response = await proceedForPayment(bookingDetails,id);
      let sessionId = response.data
       
      stripe?.redirectToCheckout({
        sessionId:sessionId
      })
    }
    
   
  };


  const selectedDate = bookingDetails.date ? new Date(bookingDetails.date) : null;
  let formattedDate;
  
  if (selectedDate && !isNaN(selectedDate.getTime())) {
    // Set time to midnight (00:00:00)
    selectedDate.setHours(0, 0, 0, 0);
    
    // Add one day to the selected date
    selectedDate.setDate(selectedDate.getDate() + 1);
    
    // Format the updated date to ISO string
    formattedDate = selectedDate.toISOString().split('T')[0]; // Extract date part only
  } else {
    console.error('Invalid date format or value:', bookingDetails.date);
  }
  


  return (
    <>
      <div className="lg:flex bg-red-100 rounded w-full  gap-1 ">
        <div className=" p-3 bg-red-200 border border-gray-200 rounded block lg:w-100 lg:w-4/6 m-1">
          <div>
            <Scrollbar
              services={services}
              setCategorySelected={setCategorySelected}
            />

            <div className="w-full lg:flex block ">
              {categorySelected.length==0 ? categorySelected.map((service: ServiceProps, index) => (
                <div className=" border-w-gray-200 bg-white rounded  p-3 m-2 lg:w-1/2 w-full">
                  <div key={index} className="flex gap-2 rounded-lg">
                    <div className="w-1/4">
                      <img
                        src={service.image}
                        alt="image"
                        className="rounded-lg w-full"
                      />
                    </div>
                    <div className="gap-y-3 w-3/4">
                      <h1 className="text-black font-semibold text-sm">
                        {service.serviceName}
                      </h1>
                      <h3 className="font-bold text-sm">₹{service.price}</h3>
                      <h6 className="flex gap-1 text-sm">
                        <FaClock className="mt-1" />
                        {service.duration} Mins
                      </h6>
                    </div>
                  </div>
                  <hr className="border-gray-400 w-full  mt-1" />
                  <div className="block text-sm">{service.description}</div>
                  <div className="flex mt-2">
                    <button
                      className="w-full bg-pink-800 text-white font -bold"
                      onClick={() => handleSelectedServices(service)}
                    >
                      SELECT
                    </button>
                  </div>
                </div>
              )):(
                <div>
                  No services
                  </div>
              )}
            </div>
          </div>
        </div>
        {/* booked services */}
        <div className=" lg:w-2/6 w-full m-1 border border-gray-300 bg-red-200  overflow-y rounded-lg" >
          <div className="p-2 w-full">
            <div className="text-center font-bold text-2xl mb-3 ">
              BOOKING DETAILS
            </div>

                <div>
                <div className="flex justify-between">
                    <div className="font-bold mb-1">Selected Date &nbsp;&nbsp; &nbsp;:</div>
                    <div className="font-bold mb-1">{formattedDate}</div>
                  </div> 
                  
                  <div className="flex justify-between">
                    <div className="font-bold mb-1">Starting Time &nbsp; &nbsp; &nbsp;:</div>
                    <div>{convertTo12HourFormat(bookingDetails.startingTime)}</div>
                  </div> 
                  <div className="flex justify-between">
                    <div className="font-bold mb-1">Ending Time &nbsp; &nbsp; &nbsp; &nbsp;:</div>
                    <div>{convertTo12HourFormat(endingTime)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-bold mb-1">Service charge &nbsp; &nbsp; &nbsp; &nbsp;:</div>
                    <div>₹100</div>
                  </div>
                 
                </div>
            <h1 className="font-bold mb-1">Selected Services</h1>
            <div className="w-full">
              {/* <tr className="flex justify-between">
                <td colSpan={3}>Service Names</td>
                <td colSpan={3}>Price</td>
              </tr> */}
              <hr className="border-b border-white w-full mb-3" />
              {selectedServices.map((service, index) => (
                <div className="border flex border-gray-100 p-2  font-bold  mt-1 shadow-lg rounded-lg bg-white  w-full">
                  <div className="text-sm w-3/4">{service.serviceName}</div>
                  <div className="text-sm w-1/4">{service.price}/-</div>
                  <button className="mt-1" onClick={() => handleDelete(index)}>
                    <IoCloseSharp />
                  </button>
                </div>
              ))}
              <div className="mt-5 w-full ">
                <div>
                  <div className="flex justify-between">
                    <p>Total time required:</p>
                    {totalTime} Mins
                  </div>
                  <div className="flex justify-between">
                    <p>Total Price:</p>
                    ₹   {totalPrice}
                  </div>
                </div>
                <button
                  className="bg-red-900 px-3 w-full font-bold mt-2 text-white"
                  onClick={handleBooking}
                >
                  BOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

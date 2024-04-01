import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import palour1 from "../../../assets/palour1.jpeg";
import { FaClock } from "react-icons/fa";
import Scrollbar from "../SinglePage/Scrollbar";
import { getAllServices, proceedForPayment } from "../../../Api/user";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import {loadStripe} from "@stripe/stripe-js"

interface bookingProps {
  bookingDetails: object;
  setBookingDetails: (data: object) => void;
}

type ServiceProps = {
  serviceName: string;
  duration: number;
  price: number;
  image: string;
  description: string;
};
const Services = ({ bookingDetails, setBookingDetails }: bookingProps) => {
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const [categorySelected, setCategorySelected] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);



  useEffect(() => {
    const fetchServices = async () => {
      const res = await getAllServices(id as string);
      // console.log("hello", res.data.data[0]);
      // console.log('parloyr',parlourName)
      setServices(res.data.data);
      setCategorySelected(res.data.data[0].services);
    };
    fetchServices();
  }, []);

  console.log(bookingDetails);

  //pushing selectedservices
  const handleSelectedServices = async (service: ServiceProps) => {
    // console.log(service)
    const isAlreadySelected = selectedServices.some(
      (s) => s.serviceName === service.serviceName
    );
    // console.log('isalready',isAlreadySelected,service.id)
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
      prevSelectedServices.splice(index, 1);
      console.log("deleted");
      return [...prevSelectedServices];
    });
  };

  //calculating ending time
  function calculateEndingTime(startingTime: string, totalDuration: number) {
    // Split the starting time into hours and minutes
    const [startHours, startMinutes] = startingTime.split(":").map(Number);

    // Create a Date object for the starting time
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    // Add the total duration to the starting time
    startDate.setMinutes(startDate.getMinutes() + totalDuration);

    // Format the ending time
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
      (acc, service) => acc + service.price,
      0
    );

    return { totalTime, totalPrice };
  };
  const { totalTime, totalPrice } = calculateTotal();





  //booking services
  const handleBooking = async () => {
    console.log("services", bookingDetails);
    // const date = new Date(bookingDetails.date).toISOString()
    // const newDate = new Date(date)
    // newDate.setHours(0,0,0,0)
    // console.log('string',newDate)
    const stripe = await loadStripe("pk_test_51OzZPkSAPPq3vrauWeZc5vQeWbax9qRxdlBMpnuOB4s7LpFBtzf2vDRwl8H6ho9oOXQkD48Gl3iqm0gpbHdyZc2600teCQntzP")
    console.log('stripe',stripe);
    
     
    const response = await proceedForPayment(bookingDetails,id);
    console.log(response);
    let sessionId = response.data
     
    const result = stripe?.redirectToCheckout({
      sessionId:sessionId
    })
  };

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
              {categorySelected.map((service: ServiceProps, index) => (
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
              ))}
            </div>
          </div>
        </div>
        {/* booked services */}
        <div className=" lg:w-2/6 w-full m-1 border border-gray-300 bg-red-200 rounded-lg">
          {/* <h1 className="text-center mt-3 text-xl font-bold mb-3"></h1> */}
          <div className="p-2 w-full">

                <div>
                  <div>
                    selected date
                  </div>
                  <div>
                    Starting time
                  </div>
                  <div>
                    Ending Time :
                  </div>
                </div>
            <h1>Selected Services</h1>
            <div className="w-full">
              {/* <tr className="flex justify-between">
                <td colSpan={3}>Service Names</td>
                <td colSpan={3}>Price</td>
              </tr> */}
              <hr className="border-b border-gray-800 w-full mb-3" />
              {selectedServices.map((service, index) => (
                <div className="border flex border-gray-100 p-2  font-bold  mt-1 shadow-lg rounded-full bg-white  w-full">
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

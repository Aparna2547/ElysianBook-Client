import React, { useState,useEffect } from "react";
import {useParams} from "react-router-dom"
import { FaClock } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { FaLocationArrow } from "react-icons/fa";
import Services from "../SinglePage/Services"
import SlotAvailability from "../SinglePage/SlotAvailability"
import { FaCommentAlt } from "react-icons/fa";
import {Link} from "react-router-dom"
import Chat from "../../../Pages/User/Chat/Chat"
import {newConversation} from "../../../Api/user"


import "./SinglePage.css";

interface parlourProps {
  ParlourDetails: {
    parlourName: string;
    landmark: string;
    name: string;
    email: string;
    locality: string;
    openingTime: string;
    closingTime: string;
    facilities: string[];
    banners: string[];
    id:string
  };
}




const SinglePageParlourDetails = ({ ParlourDetails }: parlourProps) => {
  const [page, setpage] = useState("services");
  const [bookingDetails,setBookingDetails] = useState({})
  const [isBlinking,setIsBlinking] = useState(false)
  const [chatBox,setChatBox] = useState(false)
  const [conversationId,setConversationId] = useState('')


  useEffect(()=>{
    const handleScroll = async () =>{
      const shouldBlink =  window.screenY>200
      setIsBlinking(shouldBlink)

    }
    window.addEventListener('scroll',handleScroll)
    return () =>{
      window.removeEventListener('scroll',handleScroll)
    }
  })

  const {id} = useParams()

   
  // Function to convert time to 12-hour format
  function convertTo12HourFormat(hour: string): string {
    // Check if hour is a string and contains a colon
    if (typeof hour !== 'string' || !hour.includes(':')) {
        // Handle the error, e.g., return a default value or throw an error
        console.error('Invalid hour format:', hour);
        return 'Invalid Time'; // Default return value
    }

    let hourInt = parseInt(hour.split(":")[0]);
    let minute = hour.split(":")[1];

    // If the hour is less than 12, it remains the same
    if (hourInt < 12) {
        return hour + " AM";
    }
    // If the hour is 12, it remains 12 PM
    else if (hourInt === 12) {
        return "12:" + minute + " PM";
    }
    // For hours greater than 12, subtract 12 to convert to 12-hour format
    else {
        return (hourInt - 12) + ":" + minute + " PM";
    }
}


const handleConversation =async () =>{
  setChatBox(true)
  const response  = await newConversation(id as string)
  console.log('dfji',response)
  setConversationId(response.data.data._id)

}
 
  return (
    <>
      <div className="block">
        <div className="block lg:h-80">
          <div className="lg:mb-5 p-2">
            <div className="flex mb-8 w-full flex-wrap lg:flex-nowrap gap-2">
              <div className=" w-25  lg:h-80 text-center  rounded-2xl overflow-hidden w-full lg:w-4/6">
                <img
                  className="w-screen bg-no-repeat bg-center bg-cover rounded-2xl image"
                  src={ParlourDetails.banners?.[0]}
                  alt=""
                />
              </div>
              <div className="flex gap-2 lg:flex-col lg:h-80  lg:w-2/6 w-full h-full">
                <div
                  className="bg-cover lg:h-40 lg:w-full text-center w-1/2 border rounded border-white overflow-hidden "
                  style={{}}
                >
                  <img
                    className="image rounded-2xl"
                    src={ParlourDetails.banners?.[1]}
                    alt=""
                  />
                </div>
                <div
                  className="bg-cover lg:w-full lg:h-40 w-1/2 me-0 text-center border  border-white rounded overflow-hidden "
                  style={{}}
                >
                  <img
                    src={ParlourDetails.banners?.[2]}
                    alt=""
                    className="image rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:mt-5  p-2 rounded-lg">
          <div className="  flex  lg:justify-between lg:flex-nowrap gap-2 flex-wrap  ">
            <div className=" bg-white  lg:rounded-2xl  rounded-2xl shadow-lg flex flex-col  leading-normal lg:w-1/2 w-full">
              <div className="p-4">
                <h1
                  className="text-gray-900 font-bold text-3xl mb-2 "
                  style={{ fontSize: "25px", fontWeight: "600" }}
                >
                  {ParlourDetails.parlourName}
                </h1>

                <h1
                  className="text-gray-700 t mt-2 flex me-6"
                  style={{ fontSize: "15px" }}
                >
                  <FaLocationArrow className="mt-1 me-2 font-medium" />
                  {ParlourDetails.landmark}
                  <p
                    style={{ fontSize: "15px" }}
                    className="text-gray-950 ms-2 font-medium hover:text-gray-900 transition duration-500 me-3 ease-in-out"
                  >
                    {ParlourDetails.locality}
                  </p>
                </h1>
                <h2 className="text-gray-700  flex mt-2">
                  <FaClock className="mt-1 me-2 font-medium" />
                  Opening Time
                  <p className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                    {ParlourDetails.openingTime}
                  </p>
                </h2>

                <h2 className="text-gray-700  flex mt-2">
                  <FaClock className="mt-1 me-2 font-medium" />
                  Closing Time
                  <a
                    href="#"
                    className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    {convertTo12HourFormat(ParlourDetails.closingTime)}
                    {/* {ParlourDetails.closingTime} */}
                  </a>
                </h2>
              </div>
            </div>

            <div
              className=" bg-white  lg:rounded-2xl  rounded-2xl shadow-lg flex flex-col  leading-normal lg:w-1/2 w-full p-6"
              style={{ overflowX: "hidden" }}
            >
              <div className="">
                <h3 className="text-gray-900  text-2xl mb-2 font-bold">
                  {" "}
                  Facilities
                </h3>
                <div className="text-gray-700 mt-2 flex gap-4 ">
                  {ParlourDetails.facilities ? (
                    ParlourDetails.facilities.map((facility, index) => (
                      <div key={index} className="flex gap-1 items-center">
                        <VscActivateBreakpoints /> {facility}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 mt-2">Loading facilities...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-100 p-2 lg:p-16 mt-6 flex flex-col w-full justify-center items-center ms:flex-nowrap rounded-md">

              

          <div className="w-full md:w-1/2 flex justify-center font-bold">
            <div
              className={`px-2 pb-1 cursor-pointer ${
                page == "services" && "border-b-4 border-b-orange-400"
              }`}
              onClick={() => setpage("services")}
            >
              <h1>SERVICES</h1>
            </div>
            <div
              className={`px-2 pb-1 cursor-pointer ${
                page == "review" && "border-b-4 border-b-orange-400"
              }`}
              onClick={() => setpage("review")}
            >
              <h1>REVIEWS</h1>
            </div>
           
          </div>
         
          {page === "services" ? (
            <>     
            <div  className=" bg-white text-black shadow-lg   w-full lg:my-3">
              <h1 className="text-start ms-3 mt-2 text-lg">Select you date and time</h1>
              <SlotAvailability  bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} convertTo12HourFormat={convertTo12HourFormat}/>
            </div>
            <Services bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
            </>

          ) : page === "review" ? (
            <h1 className="p-4">Booking section</h1>
          // ) : page === "wallet" ? (
          //   <h1>Wallet</h1>
          ) : null}
        </div>
      </div>
     
      {/* Chat icon */}
      <div className="bg-gray-400 w-40">
      <div
      className="mb-10 me-6"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        animation: isBlinking ? 'blink 1s infinite' : 'none',
      }}
    >
      {/* <Link to={'/chat'}>  */}
      {chatBox?
      <Chat setChatBox={setChatBox} conversationId = {conversationId} parlourId={id}/>
      :
      <div className="p-3 bg-black flex justify-center items-center rounded-full">
      <FaCommentAlt size={20}  onClick={handleConversation} className="cursor-pointer text-white" />
      </div>
      }
      {/* </Link> */}
      
    </div>
    </div>

    
    </>
  );
};

export default SinglePageParlourDetails;

import React,{useState} from "react";
import { FaLocationPinLock } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { FaLocationArrow } from "react-icons/fa";

import './SinglePage.css'


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
  };
}

const SinglePageParlourDetails = ({ ParlourDetails }: parlourProps) => {
  const [page,setpage] = useState('')
  console.log("hiaiia", ParlourDetails);
  return (
    <>
      {/* <Navbar /> */}
      <div>
      <div className="block lg:h-80">
        {/* <div
          className="bg-cover h-64 text-center overflow-hidden"
          style={{
            backgroundImage: `url(${ParlourDetails.banners?.[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="max-w-screen-xl w-full  p-5 sm:p-8 relative shadow-md border border-gray-200"
        ></div> */}
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
              <div className="bg-cover lg:h-40 lg:w-full text-center w-1/2 border rounded border-white overflow-hidden " style={{}}>
                <img className="image rounded-2xl" src={ParlourDetails.banners?.[1]} alt="" />
              </div>
              <div className="bg-cover lg:w-full lg:h-40 w-1/2 me-0 text-center border  border-white rounded overflow-hidden " style={{}}>
                <img src={ParlourDetails.banners?.[2]} alt="" className="image rounded-2xl"/>
              </div>
            
            </div>
          </div>
        </div>
      </div>

      <div className=" lg:mt-5  bg-red-200 p-2 rounded-lg">
      
      <div className="  flex  lg:justify-between lg:flex-nowrap gap-2 flex-wrap rounded-md">
        <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col  leading-normal lg:w-1/2 w-full">
            <div className="border border-gray-600  p-4">
                
            <h1 className="text-gray-900 font-bold text-3xl mb-2 " style={{fontSize:'25px',fontWeight:'600'}}>
              {ParlourDetails.parlourName}
            </h1>

            <h1 className="text-gray-700 t mt-2 flex me-6" 
                style={{fontSize:'15px'}}
            >
                
             
            
                <FaLocationArrow className="mt-1 me-2 font-medium" /> 
                {ParlourDetails.landmark}
                <p
                style={{fontSize:'15px'}}
                className="text-gray-950 ms-2 font-medium hover:text-gray-900 transition duration-500 me-3 ease-in-out"
                >
                {ParlourDetails.locality}
                </p>
            </h1>
            <h2 className="text-gray-700  flex mt-2">
                <FaClock className="mt-1 me-2 font-medium" />
                Opening Time
                <p
              
                className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
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
                {ParlourDetails.closingTime}
                </a>
            </h2>
            </div>
        </div> 

        <div className=" bg-white border border-gray-600  p-4 rounded-b lg:rounded-b-none lg:rounded-r flex lg:w-1/2 w-full" style={{overflowX:'hidden'}}>
            <div className=''>
            <h4 className="text-gray-900 font-medium text-2xl mb-2">
                {" "}
                Facilities
            </h4>
            <div className="text-gray-700 mt-2 flex gap-4 ">

            {ParlourDetails.facilities ? (

        ParlourDetails.facilities.map((facility, index) => (
                <div  key={index} className="flex gap-1 items-center">
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
      </div>
    

{/* 
        <div className="borderrelative shadow-md border border-gray-200 rounded">
        <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 min-h-96">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                    
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-10 lg:pt-4 pt-8">

                                    </div>
                                </div>
                            </div>

                            <div className=" mt-12 flex flex-col w-full justify-center items-center">
                                <div className="w-full md:w-1/2 flex justify-center font-bold">
                                    <div className={`px-2 pb-1 cursor-pointer ${page == 'profile' && 'border-b-4 border-b-orange-400'}`} onClick={() => setPage('profile')}>
                                        <h1>PROFILE</h1>
                                    </div>
                                    <div className={`px-2 pb-1 cursor-pointer ${page == 'booking' && 'border-b-4 border-b-orange-400'}`} onClick={() => setPage('booking')}>
                                        <h1>BOOKINGS</h1>
                                    </div>
                                    <div className={`px-2 pb-1 cursor-pointer ${page == 'wallet' && 'border-b-4 border-b-orange-400'}`} onClick={() => setPage('wallet')}>
                                        <h1>WALLET</h1>
                                    </div>
                                </div>


                                {page === 'profile' ? (
                                  <h1>profile</h1>
                                ) : page === 'booking' ? (
                                    <h1 className="p-4">Booking section</h1>
                                ) : page === 'wallet' ? (
                                    <h1>Wallet</h1>
                                ) : null}

                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </div> */}
    </>
  );
};

export default SinglePageParlourDetails;

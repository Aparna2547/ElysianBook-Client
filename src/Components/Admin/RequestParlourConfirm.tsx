import React from "react";
import { FaLocationPinLock } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";

const parlourRequestConfirm = () => {
return (
    <>
    {/* <Navbar /> */}
    <div className="max-w-screen-xl w-full mx-auto p-5 sm:p-8 md:p-12 relative">

    

        <div
        className="bg-cover h-64 text-center overflow-hidden"
        style={{
            height: "20rem",
            backgroundImage: `url('https://m.media-amazon.com/images/I/71wqLLW7d7L._AC_UF1000,1000_QL80_.jpg')`,
            backgroundPositionY: "center",
        }}
        ></div>

        
        <div className="max-w-2xl flex justify-between">

        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h2 className="text-gray-900 font-bold text-3xl mb-2">
                Vendor Details
            </h2>

            <h1 className="text-gray-900   mb-2" >Vendor name :</h1>
            <h1 className="text-gray-900   mb-2" >Vendor Email :</h1>

            {/* <div className="text-gray-700  mt-2 flex gap-2">
                <VscActivateBreakpoints className="mt-1" /> car parking
            </div> */}
            </div>
        </div>
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h1 className="text-gray-900 font-bold text-3xl mb-2">
                Parlour Name
            </h1>

            <h1 className="text-gray-700 t mt-2 flex me-6">
                
                Location
                <a
                href="#"
                className="text-indigo-600 ms-2 font-medium hover:text-gray-900 transition duration-500 me-3 ease-in-out"
                >
                Place
                </a>
            </h1>
            <h1 className="text-gray-700 t mt-2 flex me-6">
                <FaLocationPinLock className="mt-1 me-2 font-medium" /> map
            </h1>
            <h2 className="text-gray-700  flex mt-2">
                <FaClock className="mt-1 me-2 font-medium" />
                Opening Time
                <a
                href="#"
                className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                10.00AM
                </a>
            </h2>

            <h2 className="text-gray-700  flex mt-2">
                <FaClock className="mt-1 me-2 font-medium" />
                Closing Time
                <a
                href="#"
                className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                10.00AM
                </a>
            </h2>
            </div>
        </div>
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h2 className="text-gray-900 font-bold text-3xl mb-2">
               
                Facilities
            </h2>
            <div className="text-gray-700  mt-2 flex gap-2">
                <VscActivateBreakpoints className="mt-1" /> car parking
            </div>
            </div>
        </div>


    
        </div>
    </div>
    </>
);
};

export default parlourRequestConfirm;

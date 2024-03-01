    import React, { useEffect } from "react";
    import { FaLocationPinLock } from "react-icons/fa6";
    import { FaClock } from "react-icons/fa";
    import { VscActivateBreakpoints } from "react-icons/vsc";


    interface parlourProps{
        ParlourDetails:{
            parlourName:string,
            landmark:string,
            name:string,
            email:string,
            locality:string,
            openingTime:string,
            closingTime:string,
            facilities:string,
            banners:string

        },
        
    }
    const SinglePageComponent = ({ParlourDetails}:parlourProps) => {
        console.log('hiaiia',ParlourDetails)
    return (
        <>
        {/* <Navbar /> */}
        <div className="max-w-screen-xl w-full  p-5 sm:p-8 relative shadow-md border border-gray-200">
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
                    
                <h1 className="text-gray-900 font-bold text-3xl mb-2">
                  {ParlourDetails.parlourName}
                </h1>

                <h1 className="text-gray-700 t mt-2 flex me-6">
                    
                    {ParlourDetails.landmark},
                    <a
                    href="#"
                    className="text-indigo-600 ms-2 font-medium hover:text-gray-900 transition duration-500 me-3 ease-in-out"
                    >
                    {ParlourDetails.locality}
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
                    {ParlourDetails.openingTime}
                    </a>
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
            <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                <div className="">
                <h4 className="text-gray-900 font-medium text-2xl mb-2">
                    {" "}
                    Facilities
                </h4>
                {ParlourDetails.facilities ? (
            ParlourDetails.facilities.map((facility, index) => (
                <div key={index} className="text-gray-700 mt-2 flex gap-2 ">
                    <div className="flex gap-1 items-center">
                    <VscActivateBreakpoints /> {facility}
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-700 mt-2">Loading facilities...</p>
        )}
                </div>
                <br />
                <div className="flex mx-3">
                <h1 className="text-gray-800 text-2xl ">Status:</h1>
                <button className="bg-blue-600 p-1 mb-3 w-full font-bold text-white">{ParlourDetails.status}</button>
                </div>
            </div>

            </div>
        </div>
        </>
    );
    };

    export default SinglePageComponent;

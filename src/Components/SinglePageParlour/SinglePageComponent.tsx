    // import React from "react";
    import { FaLocationPinLock } from "react-icons/fa6";
    import { FaClock } from "react-icons/fa";
    import { VscActivateBreakpoints } from "react-icons/vsc";
    import { FaPhoneAlt } from "react-icons/fa";


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
            banners:string,
            status:string,
            contact:number

        },
        
    }
    const SinglePageComponent = ({ParlourDetails}:parlourProps) => {
        console.log('hiaiia',ParlourDetails)


    return (
        <>


        <div className="overflow-x-hidden  bg-gray-100">
        <div className="max-w-screen-xl w-full  m-5 sm:p-8 relative shadow-md border border-gray-200">

            <div className="w-full bg-white  lg:rounded-2xl  rounded-2xl shadow-lg  mb-3 " style={{height:'300px'}}>
                <img src={ParlourDetails.banners?.[0]} alt=""  className="rounded w-full h-full"/>
            </div>

            <div className="flex gap-2 w-full">
                <div className=" bg-white lg:w-1/2  lg:rounded-2xl  rounded-2xl shadow-lg flex flex-col  leading-normal  w-full p-6"
              style={{ overflowX: "hidden" }}>
                <div className="w-4/6">
                    <h1 className="text-xl font-bold text-gray-800 w-full">{ParlourDetails.parlourName}</h1>
                    <div className="flex mt-2"><FaLocationPinLock className="mt-1"/>&nbsp; <p className="mt-0 text-gray-500">{ParlourDetails.landmark},{ParlourDetails.locality}</p></div>
                    <div className="flex mt-2"><FaClock className="mt-1 me-2 font-medium" />
                    {ParlourDetails.openingTime} - {ParlourDetails.closingTime}</div>
                    <h1 className="flex mt-2"><FaPhoneAlt className="me-2 mt-1"/> {ParlourDetails.contact}</h1>
                </div>
                
                </div>
                <div
              className=" bg-white lg:w-1/2 lg:rounded-2xl  rounded-2xl shadow-lg flex flex-col  leading-normal   p-6"
              style={{ overflowX: "hidden" }}
            >
              <div >
                <h3 className="text-gray-900  text-2xl mb-2 font-bold">
                  {" "}
                  Facilities
                </h3>
                    {Array.isArray(ParlourDetails.facilities) && ParlourDetails.facilities.length > 0  ? (
                        ParlourDetails.facilities.map((facility:string,index:number) => (
                            <div key={index} className="text-gray-700 mt-2 flex gap-4 ">
                            <div  className="flex gap-1 items-center">
                        <VscActivateBreakpoints /> {facility}
                      </div>
                </div>
                        ))
                    ):(
                        <p className="text-gray-700 mt-2">Loading facilities...</p>

                    )}
                      
              </div>
            </div>

            </div>
            <div className=" flex justify-end ">
                <h1 className="bg-white p-2 mt-3 rounded border border-gray-300 flex  w-25">Status: &nbsp;<b className="text-red-700"> {ParlourDetails.status}</b></h1>
            </div>
        </div>
        </div>
        </>
    );
    };

    export default SinglePageComponent;

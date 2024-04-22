import  { useEffect, useState } from "react";
import { FaLocationPinLock } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { VscActivateBreakpoints } from "react-icons/vsc";
import {useParams} from "react-router-dom"
import { getParlourDetails } from "../../Api/admin";

interface parlour{
    backgroundImage:string,
    parlourName:string,
    banners:string,
    name:string,
    email:string,
    locality:string,
    landmark:string,
    openingTime:number,
    closingTime:number,
    facilities:[string],

}


const parlourRequestConfirm = () => {
    const [parlourDetails, setParlourDetails] = useState<parlour | null>(null);
const { id } = useParams<{ id: string }>();
    useEffect(()=>{
        const parlourFetch = async (id:string )=>{
            try{
                    const res = await getParlourDetails(id as string)
                    setParlourDetails(res.data.data)
                    console.log('faf',res.data.data)
                
                
            }catch(error){
                console.log(error)
            }
        }
        if (id) {
            parlourFetch(id);
        }
    },[])


return (
    <>
    {/* <Navbar /> */}
    {parlourDetails && (    
    <div className="max-w-screen-xl w-full mx-auto p-5 sm:p-8 md:p-12 relative">
        <div
        className="bg-cover h-64 text-center overflow-hidden"
        style={{
            height: "20rem",
            backgroundImage: parlourDetails && parlourDetails.banners && parlourDetails.banners[1] ? `url(${parlourDetails.banners[1]})` : undefined,
            backgroundPositionY: "center",
        }}
        ></div>

        
        <div className="max-w-2xl flex justify-between">

        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h2 className="text-gray-900 font-bold text-3xl mb-2">
                Vendor Details 
            </h2>

            <h1 className="text-gray-900 mb-2 text-xl" >Vendor name :{parlourDetails.name} </h1>
            <h1 className="text-gray-900 mb-2 text-xl" >Vendor Email :{parlourDetails.email}</h1>

            {/* <div className="text-gray-700  mt-2 flex gap-2">
                <VscActivateBreakpoints className="mt-1" /> car parking
            </div> */}
            </div>
        </div>
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h1 className="text-gray-900 font-bold text-3xl mb-2">
                {parlourDetails.parlourName}
            </h1>

            <h1 className="text-gray-700 t mt-2 flex me-6">
                
                {parlourDetails.locality}
                <p
               
                className="text-indigo-600 ms-2 font-medium hover:text-gray-900 transition duration-500 me-3 ease-in-out"
                >
               {parlourDetails.landmark}
                </p>
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
               {parlourDetails.openingTime}
                </a>
            </h2>

            <h2 className="text-gray-700  flex mt-2">
                <FaClock className="mt-1 me-2 font-medium" />
                Closing Time
                <a
                href="#"
                className="text-indigo-600  ms-2 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                {parlourDetails.closingTime}
                </a>
            </h2>
            </div>
        </div>
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
            <h2 className="text-gray-900 font-bold text-3xl mb-2">
               
                Facilities
            </h2>
            {parlourDetails.facilities ? (
            parlourDetails.facilities.map((facility:string, index:number) => (
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
        </div>


    
        </div>
    </div>
    )}

    </>
);
};

export default parlourRequestConfirm;

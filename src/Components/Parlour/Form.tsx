import axios from 'axios'
import React, { useState } from 'react'

const Form = () => {

  const [parlourDetails,setParlourDetails] = useState({
    parlourName:'',
    landMark:'',
    locality:'',
    district:'',
    openingTime:'',
    closingTime:'',
    contact:'',
    latitude:'',
    longitude:''
  })
  // const api = process.env.REACT_APP_GEOPIFY_API;

  // console.log('api',api)
  const [locationCheckBox,setLocationSetBox] = useState(false)



  const fetchCurrentLocation = async (e) => {
    try {
      setLocationSetBox(e.target);
      let currentLocation;
      if (!locationCheckBox) {
        console.log('selected');
        navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position);
          const location = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=be59a58f88694f3994f62b14e0211717`);
          currentLocation = location.data.results[0]
          console.log(currentLocation)
          console.log(currentLocation.city,currentLocation.road)
          setParlourDetails({...parlourDetails,landMark:currentLocation.city,locality:currentLocation.county,district:currentLocation.
            state_district,longitude:position.coords.longitude.toString(), latitude:position.coords.latitude.toString()})
        });
        
      }
    } catch (error) {
      console.log(error);
    }
  };  
  return (
    <form className="w-full  border border-grey p-3 mt-10">
        <h1 className='text-center my-3 font-bold'>Parlour Details</h1>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Parlour Name"
          value={parlourDetails.parlourName}
          onChange={(e)=>setParlourDetails({...parlourDetails,parlourName:e.target.value})}
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="LandMark"
          value={parlourDetails.landMark}
          onChange={(e)=>setParlourDetails({...parlourDetails,landMark:e.target.value})}
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Locality"
          value={parlourDetails.locality}
          onChange={(e)=>setParlourDetails({...parlourDetails,locality:e.target.value})}
          
        />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="District"
          value={parlourDetails.district}
          onChange={(e)=>setParlourDetails({...parlourDetails,district:e.target.value})}
        />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Opening Time"
          value={parlourDetails.openingTime}
          onChange={(e)=>setParlourDetails({...parlourDetails,openingTime:e.target.value})}
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="Closin Time"
          value={parlourDetails.closingTime}
          onChange={(e)=>setParlourDetails({...parlourDetails,closingTime:e.target.value})}
        />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="number"
          placeholder="Contact Number"
          value={parlourDetails.contact}
          onChange={(e)=>setParlourDetails({...parlourDetails,contact:e.target.value})}
        />
      </div>
      {/* <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="Location Link"
        />
      </div> */}
    </div>



    <div className="flex flex-wrap -mx-3 mb-6">
   
      <div className="w-full px-3 flex">

        <div className='flex'>
       
        <input
        checked={locationCheckBox}
        onChange={(e)=>fetchCurrentLocation(e)}
          id="grid-password"
          type="checkbox"
        /> <p className='text-black  mx-2'>Fetch Current Location</p>
      </div>

     

      </div>

    </div>


    <div className="flex flex-wrap -mx-3 mb-6">
    <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-3"
          htmlFor="grid-password"
        >
          Select available Faciliteies
        </label>
      <div className="w-full px-3 flex">

        <div className='flex'>
       
        <input
          id="grid-password"
          type="checkbox"
        /> <p className='text-gray-500 mx-2'>Air Conditioned</p>
      </div>

      <div className='flex mx-7'>
       
       <input
         id="grid-password"
         type="checkbox"
       /> <p className='text-gray-500 mx-1'>WIFI</p>
     </div>

     <div className='flex'>
       
       <input
         id="grid-password"
         type="checkbox"
       /> <p className='text-gray-500 mx-1'>Cards accepted</p>
     </div>
      </div>

    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-city"
        >
          Select Banners
        </label>
        <div  className='flex w-full'>
        <input
          className="appearance-none  mx-4 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city"
          type="file"
          placeholder="Albuquerque"
        />
        <input
          className="appearance-none mx-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city"
          type="file"
          placeholder="Albuquerque"
        />
        <input
          className="appearance-none mx-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city"
          type="file"
          placeholder="Albuquerque"
        />
        </div>
      </div>
    </div>
    <button className='w-full border border-blue-500 bg-blue-900 p-2 mt-3 text-white font-bold'>Request Admin For Approval</button>
  </form>
  
  )
}

export default Form
import React from 'react'

const Form = () => {
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
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="LandMark"
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
        />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="District"
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
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="Closin Time"
        />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name"
          type="text"
          placeholder="Contact Number"
        />
      </div>
      <div className="w-full md:w-1/2 px-3">
       
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          placeholder="Location Link"
        />
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
    <button className='w-full border border-blue-500 bg-blue-900 text-white font-bold'>Request Admin For Approval</button>
  </form>
  
  )
}

export default Form
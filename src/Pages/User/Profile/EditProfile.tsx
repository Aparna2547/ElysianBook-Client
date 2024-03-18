import React from 'react'
import ProfileDetails from "../../../Components/User/ProfileDetails"
import Navbar from "../../../Components/User/NavBar/Navbar"

const EditProfile = () => {
  return (
  <>
  <div className='flex'>
    <Navbar/>

  </div>
  <div>
  <div className="rounded p-6 w-full md:w-1/2 ">
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
                        Name
                    </label>
                    <h1>John</h1>
                </div>
                <button className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md">CHANGE</button>
            </div>
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
                        Email
                    </label>
                    <h1>Hohn@gmail.com</h1>
                </div>
                <button className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md">CHANGE</button>
            </div>
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
                        Password
                    </label>
                    <h1>**************</h1>
                </div>
                <button className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md">CHANGE</button>
            </div>
        </div>
  </div>
  </>
  )
}

export default EditProfile
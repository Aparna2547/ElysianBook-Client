import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from '../Pages/Parlour/Login/Login'
import SignUp from '../Pages/Parlour/SignUp/Signup'
import Otp from '../Components/Parlour/Otp/Otp'
import Dashboard from '../Pages/Parlour/Dashboard/Dashboard'
import ParlourDetails from '../Pages/Parlour/ParlourDetails/ParlourDetails'




const VendorRoutes = () => {
  return (
   <Routes>
    <Route path='dashboard' element={<Dashboard/>} />
    <Route path='' element={<Login/>} />
    <Route path='signup' element={<SignUp/>} />
    <Route path='verifyOtp' element={<Otp/>} />
    <Route path = 'parlourDetails' element={<ParlourDetails/>}/>

   </Routes>
  )
}

export default VendorRoutes
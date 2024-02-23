import React from 'react'
import {Route,Routes} from "react-router-dom"

import Otp from '../Components/Otp/Otp'
import Home from '../Pages/User/Home/Home'
import Login from '../Pages/User/Login/Login'
import SignUp from '../Pages/User/SignUp/SignUp'
import Email from '../Pages/User/Email/Email'
import ParloursPage from '../Pages/User/Parlour/ParloursPage'
import PasswordChange from '../Pages/User/PasswordChange/PasswordChange'
import UserLoggedOut from '../Components/User/UserLoggedOut'

const UserRoutes = () => {
  return (
<Routes>
  <Route path='' element={<Home/>} />

  <Route path ='' element={<UserLoggedOut/>} >
     <Route path='login' element={<Login />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='verifyOtp' element={<Otp/>} />
    <Route path = 'forgotPassword' element={<Email/>} />
    <Route path="changePassword" element={<PasswordChange/>} />
    <Route path = 'parlourlist' element = {<ParloursPage/>} />

</Route>

    

</Routes>
  )
}

export default UserRoutes
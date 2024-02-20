import React from 'react'
import {Route,Routes} from "react-router-dom"

import Otp from '../Components/Otp/Otp'
import Home from '../Pages/User/Home/Home'
import Login from '../Pages/User/Login/Login'
import SignUp from '../Pages/User/SignUp/SignUp'

const UserRoutes = () => {
  return (
<Routes>
  <Route path='' element={<Home/>} />
     <Route path='login' element={<Login />} />
    <Route path='verifymail' element={<SignUp />} />
    <Route path='signup' element={<Otp/>} />

</Routes>
  )
}

export default UserRoutes
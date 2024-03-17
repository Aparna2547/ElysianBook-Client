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
import UserProtect from '../Components/User/UserProtect'
import ParlourDetails from '../Pages/User/ParlourDetails/ParlourDetails'
import Profile from '../Pages/User/Profile/Profile'
import EditProfile from '../Pages/User/Profile/EditProfile'
import Sidebar from "../Components/User/Sidebar"

const UserRoutes = () => {
  return (
<Routes>
  <Route path='' element={<Home/>} />

  <Route path ='' element={<UserLoggedOut/>} >
     <Route path='login' element={<Login />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='verifyOtp' element={<Otp/>} />
    <Route path = 'forgotPassword' element={<Email user={true}/>} />
    <Route path="changePassword" element={<PasswordChange  user={true}/>} />

</Route>
<Route path='' element={<UserProtect/>} >
<Route path = 'parlourlist' element = {<ParloursPage/>} />
<Route path = 'parlourDetails/:id' element =  {<ParlourDetails/>}/>
<Route path = 'profilePage' element={<Sidebar/>} />
<Route path='profile' element={<Profile/>} />
<Route path='EditProfile' element={<EditProfile/>} />
</Route>
    

</Routes>
  )
}

export default UserRoutes
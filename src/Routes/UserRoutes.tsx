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
import BookingSuccess from '../Components/User/BookingSuccess'
import BookingHistory from "../Pages/User/Booking/BookingHistory"
// import Chat from "../Pages/User/Chat/Chat"




const UserRoutes = () => {
  return (
<Routes>
  <Route path='' element={<Home/>} />
  <Route path = 'parlourlist' element = {<ParloursPage/>} />
<Route path = 'parlourDetails/:id' element =  {<ParlourDetails/>}/>

  <Route path ='' element={<UserLoggedOut/>} >
     <Route path='login' element={<Login />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='verifyOtp' element={<Otp/>} />
    <Route path = 'forgotPassword' element={<Email user={true}/>} />
    <Route path="changePassword" element={<PasswordChange  user={true}/>} />
    

</Route>
<Route path='' element={<UserProtect/>} >

<Route path = 'profilePage' element={<Profile/>} />
<Route path='profile' element={<Profile/>} />
<Route path='bookingSuccessful' element={<BookingSuccess/>} />
<Route path="viewBookings" element ={<BookingHistory/>} />
{/* <Route path='chat' element={<Chat/>}/> */}

</Route>  
    

</Routes>
  )
}

export default UserRoutes
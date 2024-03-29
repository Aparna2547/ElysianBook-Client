import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Parlour/Login/Login";
import SignUp from "../Pages/Parlour/SignUp/Signup";
import Otp from "../Components/Parlour/Otp/Otp";
import Dashboard from "../Pages/Parlour/Dashboard/Dashboard";
import ParlourDetails from "../Pages/Parlour/ParlourDetails/ParlourDetails";
import EditParlour from "../Pages/Parlour/ParlourDetails/EditParlour"
import ParlourLoggedOut from "../Components/Parlour/ParlourLoggedOut";
import ParlourProtect from "../Components/Parlour/ParlourProtect";
import Email from "../Pages/User/Email/Email";
import PasswordChange from "../Pages/User/PasswordChange/PasswordChange";
import Services from "../Pages/Parlour/Services/Services";
import Profile from "../Pages/Parlour/Profile/Profile";
import EditProfile from "../Pages/Parlour/Profile/EditProfile";
import ChangeEmailVerifyOtp from "../Components/Parlour/Otp/ChangeEmailVerifyOtp"

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ParlourLoggedOut />}>
        <Route path="" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route path="verifyOtp" element={<Otp />} /> */}
        <Route path = 'forgotPassword' element={<Email user={false}/>} />
        <Route path="changePassword" element={<PasswordChange  user={false}/>} />
      </Route>
      <Route path="verifyOtp" element={<Otp />} />

      <Route path="" element={<ParlourProtect />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="parlourDetails" element={<ParlourDetails />} />
        <Route path  = "editParlour" element={<EditParlour/>}/>
        <Route path = 'services' element ={<Services/>} />
        <Route path = "vendorProfile" element={<Profile/>}/>
        <Route path = "editVendorProfile" element={<EditProfile/>}/>
        <Route path = "ChangeEmailVerifyOtp" element ={<ChangeEmailVerifyOtp/>}/>
      </Route>
    </Routes>
  );
};

export default VendorRoutes;

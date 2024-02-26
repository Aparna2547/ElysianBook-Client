import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Parlour/Login/Login";
import SignUp from "../Pages/Parlour/SignUp/Signup";
import Otp from "../Components/Parlour/Otp/Otp";
import Dashboard from "../Pages/Parlour/Dashboard/Dashboard";
import ParlourDetails from "../Pages/Parlour/ParlourDetails/ParlourDetails";
import ParlourLoggedOut from "../Components/Parlour/ParlourLoggedOut";
import ParlourProtect from "../Components/Parlour/ParlourProtect";
import Email from "../Pages/User/Email/Email";
import PasswordChange from "../Pages/User/PasswordChange/PasswordChange";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ParlourLoggedOut />}>
        <Route path="" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verifyOtp" element={<Otp />} />
        <Route path = 'forgotPassword' element={<Email user={false}/>} />
        <Route path="changePassword" element={<PasswordChange  user={false}/>} />
      </Route>

      <Route path="" element={<ParlourProtect />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="parlourDetails" element={<ParlourDetails />} />
      </Route>
    </Routes>
  );
};

export default VendorRoutes;

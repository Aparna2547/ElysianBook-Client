import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Admin/Login/Login";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import User from "../Pages/Admin/User/User";
import Categories from "../Pages/Admin/Categories/Categories";
import Parlour from "../Pages/Admin/Parlour/Parlour";
import AdminLoggedOut from "../Components/Admin/AdminLoggedOut";
import AdminProtect from "../Components/Admin/AdminProtect";
import Facilities from "../Pages/Admin/Facilities/Facilities";
import SinglePage from "../Pages/Admin/SinglePage/SinglePage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLoggedOut />}>
        <Route path="" element={<Login />} />
      </Route>

      <Route path="" element={<AdminProtect />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="categories" element={<Categories />} />
        <Route path="parlour" element={<Parlour />} />
        <Route path="facilites" element={<Facilities/>} />
        <Route path='singleParlour' element={<SinglePage/>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

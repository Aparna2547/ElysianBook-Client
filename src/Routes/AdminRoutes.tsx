import React from 'react';
import {Route,Routes} from "react-router-dom"

import Login from '../Pages/Admin/Login/Login';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import User from '../Pages/Admin/User/User';
import Categories from '../Pages/Admin/Categories/Categories';

const AdminRoutes = () => {
  return (
      <Routes>
      <Route path='' element={<Login/>} />
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='user' element={<User/>}/>
      <Route path = 'categories' element={<Categories/>}/>
      </Routes>
  );
};

export default AdminRoutes;

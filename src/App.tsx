import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./Routes/AdminRoutes";
import Chat from "./Pages/User/Chat/Chat"
import { io } from "socket.io-client";


// const socket = io('http://localhost:3000');

function App() {
  return (
    <>
    <ToastContainer />
    {/* <Chat /> */}
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/parlour/*" element={<VendorRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import VendorRoutes from "./Routes/VendorRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { Toaster } from 'sonner'



function App() {
  return (
    <>
    {/* <ToastContainer /> */}
    {/* <Chat /> */}
    <Toaster richColors position="top-center"  />
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

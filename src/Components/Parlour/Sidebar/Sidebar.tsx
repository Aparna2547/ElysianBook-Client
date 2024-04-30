import { useState } from "react";
import logo from "../../../assets/logo.png" 
import { MdDashboard } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { MdCleaningServices } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import {Link} from 'react-router-dom'
import { vendorLogout } from "../../../Api/parlour";
import { useDispatch } from "react-redux";
import { parlourLogout } from "../../../Store/slice/authSlice";
import { TiMessages } from "react-icons/ti";
import { ImProfile } from "react-icons/im";



const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <MdDashboard/>,link:"/parlour/dashboard", gap: true },
    { title: "Parlour", src: <GiShop/> ,link:"/parlour/parlourdetails", gap: true},
    { title: "Services", src:<MdCleaningServices/>,link:"/parlour/services", gap: true },
    { title: "Booking ", src: <FaRegCalendarAlt/> ,link:"/parlour/bookings",gap: true },
    { title: "Profile ", src: <ImProfile/> ,link:"/parlour/vendorprofile",gap: true },
    { title: "Messages ", src: <TiMessages/> ,link:"/parlour/parlourChat",gap: true },
    { title: "holidays ", src: <TiMessages/> ,link:"/parlour/holidays",gap: true },
    
  ];
  const dispatch = useDispatch()


  const handleLogout = async ()=>{
    try{
      const res = await vendorLogout()
      console.log(res)
      dispatch(parlourLogout());
    }catch(error){
      console.log(error)
    }
  }
  return (
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-blue-900 overflow-hidden h-screen p-5   pt-8 relative duration-300`}
      >
        <img
          src={logo}
          className={`absolute cursor-pointer -right-5 top-9 w-10 bg-white border-purple-900
           border-2 rounded-full`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4  items-center">
          <img
            // src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
          ELYSIAN BOOK
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link}>
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-base items-center gap-x-4  
              ${Menu.gap ? "mt-5" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <h1 className="text-2xl">{Menu.src}</h1>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}

<li onClick={handleLogout}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-base items-center gap-x-4  
              mt-5 `}
            >
              <h1 className="text-2xl"><RiLogoutCircleLine/></h1>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
        </ul>
      </div>

  );
};
export default Sidebar;

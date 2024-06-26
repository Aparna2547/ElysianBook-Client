import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { PiFlagBannerBold } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../Store/slice/authSlice";


interface Menu {
  name: string;
  link: string;
  icon: React.ElementType;
  margin?: boolean;
}

const Home = () => {
  const menus:Menu[] = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "Users", link: "/admin/user", icon: AiOutlineUser },
    { name: "Parlours", link: "/admin/parlour", icon: AiOutlineUser },
    { name: "Categories", link: "/admin/categories", icon: BiCategory },
    { name: "Facilities", link: "/admin/facilites", icon: BiCategory },
    { name: "Request", link: "/admin/parlourRequest", icon: FaCodePullRequest },
    { name: "Banners", link: "/admin/banners", icon: PiFlagBannerBold },
     
  ];
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout= async ()=>{
    try{
      await adminLogout()
      dispatch(adminLogout())
      navigate('/admin')
    }catch(error){
      
    }
  }

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <div onClick={handleLogout}
              className={` ${
                "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
            >
          <div>{React.createElement(RiLogoutCircleLine, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `1000ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Logout
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                LOGOUT
              </h2>
              </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

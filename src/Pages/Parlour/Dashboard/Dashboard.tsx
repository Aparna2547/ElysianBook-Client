import React,{useEffect,useState} from "react";
import App from "../../../Components/Parlour/Sidebar/Sidebar";
import { FaCashRegister } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import Chart from "../../../Components/Parlour/ChartComp"
import {dashboardDetails} from '../../../Api/parlour'
import { MdFreeCancellation } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import PieChart from "../../../Components/Parlour/PieChart"


type detailsProps ={
  allBookings:number;
  totalRevenue:number;
  cancelledBookings:number;
  profit:number

}
const Dashboard = () => {
  const [details,setDetails] = useState<detailsProps | null>(null)

    useEffect(()=>{
        const fetchDetails = async () =>{
            const res = await dashboardDetails()
            console.log(res.data.data)
            setDetails(res.data.data)
        }
        fetchDetails()
    },[])
  return (
    <div className="flex bg-gray-200 overflow-x-hidden">
      <App />
      <div className="h-screen flex-1 p-7">
        <div className="w-full">
          <h1 className="font-bold text-2xl mb-10">Dashboard</h1>
          <div className=" w-full flex mb-2">
          
            <div className="first-div rounded ms-5">
              <span className="font-bold ms-2 text-lg text-gray-600 mt-4">
                Bookings
              </span>
              <div className="second-div rounded flex justify-center items-start ">
                <FaRegCalendarCheck className="text-white text-3xl my-3" />
              </div>
              <div className="ms-4 mt-2 text-lg font-bold">
                {details?.allBookings}
              </div>
            </div>


            <div className="first-div rounded ms-5 ">
              <span className="font-bold text-lg ms-3 text-gray-600 mt-4">
                Cancelled
              </span>
              <div className="second-div rounded bg-yellow-400 flex justify-center items-center ">
                <MdFreeCancellation className="text-4xl text-white my-3" />
              </div>
              <div className="ms-4 mt-2 text-lg font-bold">
                {details?.cancelledBookings}
              </div>
            </div>
            <div className="first-div rounded ms-10">
              <span className="font-bold ms-2 text-lg text-gray-600 mt-4">
                Revenue
              </span>

              <div className="second-div rounded bg-green-700 flex justify-center items-center">
                <FaCashRegister className="text-white text-3xl my-2" />
              </div>
              <div className="ms-4 mt-2 text-lg font-bold">
                ₹{details?.totalRevenue}
              </div>
            </div>
            <div className="first-div rounded ms-10">
              <span className="font-bold ms-2 text-lg text-gray-600 mt-4">
                Profit
              </span>

              <div className="second-div rounded bg-violet-700 flex justify-center items-center">
                <BsCashCoin className="text-white text-3xl my-3" />
              </div>
              <div className="ms-4 mt-2 text-lg font-bold">
               ₹ {details?.profit}
              </div>
            </div>
          </div>
          <div className="bg-white p-5 flex">
            <div>
            <Chart/>
            </div>
            
            <div>
              <PieChart />
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import {useState,useEffect} from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import "./dashboard.css";
import parlourImg from "../../../assets/building.png";
import { FaUserGroup } from "react-icons/fa6";
import ChartComponent from '../../../Components/Admin/Chart/Chart'
import {totalDetails} from '../../../Api/admin'

const Dashboard = () => {
  const [users,setUsers] = useState('')
  const [parlour,setParlour] = useState('')
  const [revenue,setRevenue] = useState('')

  useEffect(()=>{
    const fetchDetails = async () =>{
      const res = await totalDetails()
      setUsers(res.data.data.allUsers)
      setParlour(res.data.data.allParlours)
      setRevenue(res.data.data.revenue)
    }
    fetchDetails()
  },[])
  return (
    <div className="flex bg-gray-200 overflow-x-hidden ">
      <Home />
      <div>
      <div className="w-full">
        <h1 className="font-bold text-2xl m-4">Dashboard</h1>
        <div className=" m-10 w-full flex gap-5">
          <div className="first-div rounded ms-10 ">
            <span className="font-bold text-lg ms-3 text-gray-600 mt-4">USERS</span> 
            <div className="second-div rounded bg-yellow-400 ">
                <FaUserGroup className="w-full mt-5"/>
            </div>
            <div className="ms-4 mt-2 text-lg font-bold">
              {users}
            </div>
          </div>
          <div className="first-div rounded ms-10">
          <span className="font-bold ms-2 text-lg text-gray-600 mt-4">PARLOUR</span> 

            <div className="second-div rounded px-5 py-2">
              <img src={parlourImg} className="w-10" alt="" />
            </div>
            <div className="ms-4 mt-2 text-lg font-bold">
              {parlour}
            </div>
          </div>
          <div className="first-div rounded ms-10">
          <span className="font-bold ms-2 text-lg text-gray-600 mt-4">REVENUE</span> 

            <div className="second-div rounded bg-green-700 px-5 py-2">

            </div>
            <div className="ms-4 mt-2 text-lg font-bold">
             ₹ {revenue}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 mx-5 p-5 flex justify-center items-center bg-white">
        <ChartComponent/>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;

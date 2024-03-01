import React, { useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import RequestParlourConfirm from "../../../Components/Admin/RequestParlourConfirm";
import { useParams,useNavigate } from 'react-router-dom';
import { ParlourRequestConfirmation } from "../../../Api/admin";



const ParlourRequestCheck = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate()
    
    const handleRequestConfirmation = async (value: string) => {
      try {
        console.log('confirmation value:', value);
        console.log('id:', id);
        const res = await ParlourRequestConfirmation(value, id as string);
        navigate('/admin/parlourRequest')
        return res;

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex">
      <Home />
      <div className="block  w-full ">
        <div className="flex justify-center mt-5 gap-2 ">
          <div className="border border-gray-300 shadow-md p-5">
            <p className="text-gray-700 text-base">
              This Vendor requested for the approval to add the parlour in this
              site{" "}
            </p>
            <br />
            <div className="flex justify-center gap-4">
              <button className="bg-green-800 text-white p-2 font-bold border border-green-900"
              onClick={()=>handleRequestConfirmation('Active')}
              >
                accept
              </button>
              <button className="bg-red-800 text-white p-2 text-x font-bold border border-red-900"
              onClick={()=>handleRequestConfirmation('Rejected')}
              >
                Reject
              </button>
            </div>
          </div>

          <div className="max-w-sm rounded overflow-hidden shadow-lg"></div>
        </div>
        <div>
          <RequestParlourConfirm id={id} />
        </div>
      </div>
    </div>
  );
};

export default ParlourRequestCheck;

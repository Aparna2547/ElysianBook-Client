import React, { useEffect, useState } from 'react'
import { allParlours } from '../../../Api/admin'
import {Link} from "react-router-dom"
import Home from '../../../Components/Admin/Sidebar/Sidebarcheck'


const ParlourRequest = () => {
  const [parlourDetails,setParlourDetails] = useState({})

  useEffect(()=>{
   const fetchParlours = async ()=>{
    try {
      const res = await allParlours();
      console.log(res.data.data)
      setParlourDetails(res.data.data)
    } catch (error) {
      console.log(error);
      
    }
   }
   fetchParlours()
  },[])



  return (
 <>
   <div className="flex">
        <Home />
        <div className="flex w-full">
          <div className="block w-full">
            <div>
              <h1 className="font-bold m-3">PARLOURS</h1>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Removed unnecessary commented-out <th> */}
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Vendor Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Vendor Email
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Parlour Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Place
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {parlourDetails.length > 0  ? (
                    parlourDetails.filter(parlour => parlour.status=="Pending").map((parlour) => (
                      <tr key={parlour._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{parlour.name}</td> 
                        <td className="px-6 py-4">{parlour.email}</td> 
                        <td className="px-6 py-4">{parlour.parlourName}</td> 
                        <td className="px-6 py-4">{parlour.locality}</td>

                        { parlour.status=="Registered"?(
                          <td>Registered</td>
                      
                        ):(
                          // <Link to={`/admin/parlourRequestApproval/${parlour._id}`}>                    
                          <Link to={`/admin/parlourRequestApproval/${parlour._id}`}>                    
                          <td className="px-6 py-4">
                          <button className="border border-black bg-black text-white font-bold px-2 px-3">view</button>
                        </td>
                        </Link>
                        )}
                       
                      </tr>
                    ))  
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No parlour data found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
 </>
  )
}

export default ParlourRequest
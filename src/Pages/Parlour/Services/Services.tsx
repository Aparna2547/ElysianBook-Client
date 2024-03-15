import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import Pagination from "../../../Components/Parlour/Pagination";
import ServiceModal from "../../../Components/Parlour/ServiceModal";
import { allService } from "../../../Api/parlour";

const Services = () => {
  const [services,setServices] = useState({})
  const[showModal,setShowModal] = useState(false)

  

  useEffect(()=>{
    const fetchServices = async ()=>{
      try{
        const res = await allService();
        console.log(res)

      }catch(error){
        console.log(error)
      }
    }
    fetchServices()
  },[showModal])

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="m-4 w-full">
          <div className="flex justify-between mt-3">
            <div className="text-2xl font-bold">Services</div>
            <div>
              <div className="pt-2 relative mx-auto text-gray-600 flex justify-end  w-3/4">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-4"
                >
                  <svg
                    className="text-gray-600 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    style={
                      {
                        enableBackground: "new 0 0 56.966 56.966",
                      } as React.CSSProperties
                    }
                    xmlSpace="preserve"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">Service Name</div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Category
                     
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Status
                     
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
             
                <tr className="bg-white ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                
              </tbody>
            </table>
        </div>
<div className="flex justify-end">
    <button className="btn bg-blue-700 p-2 text-white font-bold"
    onClick={()=>{
      setShowModal(true)
    }}
    >Add Service</button>
</div>

        </div>

      </div>

      {/* <Pagination/> */}


      {showModal && <ServiceModal setShowModal ={setShowModal} />}
    </>


  );
};

export default Services;

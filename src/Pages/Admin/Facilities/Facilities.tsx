import React, { useEffect, useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import Api from "../../../Services/axios";
import FacilityModal from "../../../Components/Admin/FacilityModal"

interface FacilityObject {
  facilities: string[]; 
}


const Facilities = () => {
  // const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await Api.get("/admin/facilities");
        setFacilities(response.data);
      } catch (error) {
      }
    };
    fetchFacilities();
  }, [showModal]);

  return (
    <>
      <div className="flex">
        <Home />

        <div className="block w-full">
          <div>
            <h1 className="font-bold m-3 ">Categories</h1>
          </div>

          <div className="text-right p-3 flex ">
            <div className="w-3/4"></div>
            
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Facility
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    {facilities.map((facilityObj:FacilityObject, index) => (
      <React.Fragment key={index}>
        {facilityObj.facilities.map((facility, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="px-6 py-4">{facility}</td>
            
          </tr>
        ))}
      </React.Fragment>
    ))}
              </tbody>
            </table>
          </div>

          {/* add category */}
          <div className="text-right">
            <button
              className="bg-gray-900 font-bold rounded-md p-1.5 text-sm text-white mx-4"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add Faciliy
            </button>
          </div>
        </div>
      </div>

      {showModal && <FacilityModal setShowModal={setShowModal} />}
    </>
  );
};

export default Facilities;

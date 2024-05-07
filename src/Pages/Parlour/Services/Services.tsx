import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import Pagination from "../../../Components/Parlour/Pagination";
import ServiceModal from "../../../Components/Parlour/ServiceModal";
import { allService, editService, listService } from "../../../Api/parlour";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import Confirmation from "../../../Components/Parlour/Confirmation";
import EditService from "../../../Components/Parlour/EditService";
import Loading from "../../../Components/Loading/Loading"

type serviceType = {
  category: {
    _id: string; // Assuming category has an _id property
    catName: string; // Assuming category also has a catName property
  };
  _id: string;
  image: string;
  serviceName: string;
  duration: number;
  price: number;
  description: string;
  isListed: boolean;
};
const Services = () => {
  const [services, setServices] = useState<serviceType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //for listing
  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState("");

  //for edit
  const [editModal, setEditModal] = useState(false);
  const [serviceForEdit, setServiceForEdit] = useState({
    _id: "",
    serviceName: "",
    category: "",
    duration: 0,
    price: 0,
    description: "",
    image: "",
  });
  const [imageForEdit, setImageForEdit] = useState<File | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await allService(searchTerm, currentPage);
        if(res.data){
          setServices(res.data.data.allservices);
          setTotalPages(res.data.data.totalPages);
          setLoading(false)
        }
     
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [showModal, searchTerm, modal, editModal]);

  //for listing
  const handleModal = async (id: string) => {
    try {
      setListId(id);
      setModal(true);
    } catch (error) {
    }
  };

  const listServices = async () => {
    try {
      const res = await listService(listId);
      if (res.data) {
        setModal(false);
        toast.success("service list changed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (index: number) => {
    try {
      // Assuming services is an array of serviceType
      const selectedService = services[index];
      if (selectedService) {
        setServiceForEdit({
          _id: selectedService._id,
          serviceName: selectedService.serviceName,
          category: selectedService.category._id,
          duration: selectedService.duration,
          price: selectedService.price,
          description: selectedService.description || "",
          image: selectedService.image,
        });
        setEditModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    const serviceNameExist = services.filter(
      (e) =>
        e.serviceName == serviceForEdit.serviceName &&
        e._id !== serviceForEdit._id
    );
    if (serviceNameExist.length !== 0) {
      toast.error("Service exists");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceForEdit.serviceName);
    formData.append("category", serviceForEdit.category); // Assuming category is already a valid value here
    formData.append("duration", serviceForEdit.duration.toString());
    formData.append("price", serviceForEdit.price.toString());
    formData.append("description", serviceForEdit.description);
    if (imageForEdit) {
      formData.append("image", imageForEdit);
    }


    try {
      const res = await editService(serviceForEdit._id, formData);
      setEditModal(false);
      if(res){
        toast.success("Service edited successfully");
      }
    } catch (error) {
      toast.error("Failed to edit service");
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="m-4 w-full overflow-y-auto">
          <div className="flex justify-between mt-3">
            <div className="text-2xl font-bold">Services</div>
            <div>
              <div className="pt-2 relative mx-auto text-gray-600 flex justify-end  w-3/4">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
          {loading ? (
            <Loading />
          ) : (
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
                      <div className="flex items-center">Category</div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">duration</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Price</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Status</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {services ? (
                  <tbody>
                    {services.map((service, index) => (
                      <tr className="bg-white" key={service._id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={service.image}
                              alt="image"
                            />
                          </div>
                        </th>
                        <td className="px-6 py-4 text-gray-800">
                          {service.serviceName}
                        </td>
                        <td className="px-6 py-4  text-gray-800">
                          {service.category ? service.category.catName : "N/A"}
                        </td>
                        <td className="px-6 py-4  text-gray-800">
                          {service.duration}
                        </td>
                        <td className="px-6 py-4  text-gray-800">
                          ₹{service.price}
                        </td>
                        <td className="px-6 py-4  text-gray-800">
                          {service.isListed ? (
                            <button
                              onClick={() => handleModal(service._id)}
                              className="border border-green-600 text-green-600 px-4 font-bold"
                            >
                              list
                            </button>
                          ) : (
                            <button
                              onClick={() => handleModal(service._id)}
                              className="border border-red-600 text-red-600 px-3 font-bold"
                            >
                              Unlist
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleEdit(index)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <h1 className="text-center text-red-500">
                        No data available
                      </h1>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          )}

          <div className="flex justify-end">
            <button
              className="btn bg-blue-700 p-2 text-white font-bold"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add Service
            </button>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* for listing */}
      {modal && (
        <Confirmation setModal={setModal} changeItemStatus={listServices} />
      )}
      {/* //for adding */}
      {showModal && <ServiceModal setShowModal={setShowModal} />}

      {/* for editing */}
      {editModal && (
        <EditService
          setServiceForEdit={setServiceForEdit}
          serviceForEdit={serviceForEdit}
          imageForEdit={imageForEdit}
          setImageForEdit={setImageForEdit}
          handleEditSubmit={handleEditSubmit}
          setEditModal={setEditModal}
        />
      )}
    </>
  );
};

export default Services;

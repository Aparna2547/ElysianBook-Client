import React, { useEffect, useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import CategoryModal from "../../../Components/Admin/CategoryModal";
import Api from "../../../Services/axios";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../Components/Admin/ConfirmationModal";
import { hideCategory,editCategory } from "../../../Api/admin";
import { toast } from "react-toastify";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState("");
  const [categories, setCategories] = useState([]);
  // const [modalType,setModalType] = useState(null)
  // const [,editModal,setEditModal] = useState()
// 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Api.get("/admin/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [modal,showModal]);

  //for listing
  const handleModal = async (id: string) => {
    try {
      setListId(id);
      setModal(true)
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit= async (id:string)=>{
    try{
      // setModalType('edit')
      console.log('hadh')
      const res = await editCategory(id)
      console.log(res)
    }catch(error){
      console.log(error);
      
    }
  }

  const listCategory = async ()=>{
    try {
        const res = await hideCategory(listId)
        console.log(res)
        if(res.data.data){
            setModal(false)
            toast.success("Category listing permission changed")
        }
    } catch (error) {
        console.log(error);
        
    }
  }

  

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
            <div className="w-1/4">
              <form className="search-box p-1   border border-gray rounded-s-xl">
                <input
                  type="text"
                  name="search"
                  className="form-control d-inline"
                  placeholder="Enter the name"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr className="hover:bg-gray-50" key={category._id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={category.image}
                            alt=""
                          />
                        </div>
                      </th>
                      <td className="px-6 py-4">{category.catName}</td>

                      <td className="px-6 py-4">
                        {category.hide ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            UnListed
                          </span>
                        ) : (
                          <span
                            onClick={() => hideCategory(category._id)}
                            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            Listed
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                          <button
                            x-data="{ tooltip: 'Delete' }"
                            onClick={() => handleModal(category._id)}
                          >
                            <FaRegEyeSlash />
                          </button>
                          <button x-data="{ tooltip: 'Edite' }"  onClick={()=>handleEdit(category._id)}>
                            <MdEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>
                    <td colSpan={3}> cat not found</td>
                  </div>
                )}
              </tbody>
            </table>
          </div>

          {/* add category */}
          <div className="text-right">
            <button
              className="bg-gray-900 font-bold rounded-md p-1.5 text-sm text-white mx-4"
              onClick={() => {
                setShowModal(true);
                // setModalType('add')
              }}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
      {modal && <ConfirmationModal  setModal = {setModal} listCategory = {listCategory}/>}
      {showModal && <CategoryModal setShowModal={setShowModal} />}


      {/* {modalType === 'add' && <CategoryModal setShowModal={setShowModal} />} */}
{/* {modalType === 'edit' && <CategoryModal setEditModal={setEditModal} />} */}
    </>
  );
};

export default Categories;

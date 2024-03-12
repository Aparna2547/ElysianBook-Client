import React, { useEffect, useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import CategoryModal from "../../../Components/Admin/CategoryModal";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../Components/Admin/ConfirmationModal";
import { hideCategory,editCategory, allCategory } from "../../../Api/admin";
import { toast } from "react-toastify";
import EditCategory from "../../../Components/Admin/EditCategory";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState("");

  const [searchTerm,setSearchTerm] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  
  //for edit
  const [editModal,setEditModal] = useState(false)
  const [categoryForEdit,setCategoryForEdit] = useState({_id:'',
    catName:'',
    image:''})
  const [imageForEdit,setImageForEdit] = useState(null)

// 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allCategory(searchTerm,currentPage);
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages)
        console.log('abc',response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [modal,showModal,editModal,searchTerm,currentPage]);

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

  const handleEdit= async (index:number)=>{
    try{
      console.log('hadh')
      setCategoryForEdit(categories[index])
      setEditModal(true)


      // const res = await editCategory(id)
      // console.log(res)
    }catch(error){
      console.log(error);
      
    }
  }


  const handleEditSubmit = async (e:any)=>{
    e.preventDefault()
    console.log(categoryForEdit,imageForEdit) 
    const nameExist = categories.filter((e)=>(e.catName==categoryForEdit.catName && e._id != categoryForEdit._id))
    console.log('sdd',nameExist)
    if(nameExist.length != 0){
      toast.error("category already exist")
    }
    const formData = new FormData()
    formData.append('catName',categoryForEdit.catName)
    formData.append('image',imageForEdit)

    const res = await editCategory(categoryForEdit._id,formData)
    console.log(res)
    setEditModal(false)
    toast.success("category edited")
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
      
          <div className="flex">
            <div>
              <h1 className="font-bold m-3">Categories</h1>
            </div>
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
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
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
                  categories.map((category,index) => (
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
                          <button x-data="{ tooltip: 'Edite' }"  onClick={()=>handleEdit(index)}>
                            <MdEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>
                    <div  className="text-center w-full"> cat not found</div>
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


          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center justify-end">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage == 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-gray-900 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {currentPage}
              </p>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={totalPages + 1 == currentPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
        </div>

        
      </div>
      {modal && <ConfirmationModal  setModal = {setModal} listCategory = {listCategory}/>}
      {showModal && <CategoryModal setShowModal={setShowModal} />}
      {editModal && <EditCategory  setCategoryForEdit ={setCategoryForEdit} categoryForEdit = {categoryForEdit} 
      imageForEdit = {imageForEdit} setImageForEdit = {setImageForEdit} handleEditSubmit={handleEditSubmit}
      setEditModal={setEditModal}
      />}


    </>
  );
};

export default Categories;

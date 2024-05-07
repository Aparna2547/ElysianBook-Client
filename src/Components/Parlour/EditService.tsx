import  { useEffect, useState } from "react";
import { categoriesToShow } from "../../Api/parlour";



interface editServiceProps {
  serviceForEdit: {
    _id: string;
    serviceName: string;
    category: string;
    duration: number;
    price: number;
    description: string;
    image: string;
  };
  // setServiceForEdit: (value:object) => void;
  setServiceForEdit: React.Dispatch<React.SetStateAction<{ _id: string; serviceName: string; category: string; duration: number; price: number; description: string; image: string; }>>;

  imageForEdit: null | File;
  // setImageForEdit: (value: null | object) => void;
  setImageForEdit: React.Dispatch<React.SetStateAction<File | null>>;

  handleEditSubmit: (e: any) => void;
  setEditModal: (value: boolean) => void;
}

type Category = {
  _id:string,
  catName:string
}




const EditService = ({
  serviceForEdit,
  setServiceForEdit,
  setImageForEdit,
  handleEditSubmit,
  setEditModal,
}: editServiceProps) => {

    
  const handleImageChange = (e:any) => {
    // setServiceForEdit({
    //   ...serviceForEdit,
    //   image: URL.createObjectURL(e.target.files[0]),
    // });
    // setImageForEdit(e.target.files[0]);
    const file = e.target.files[0];
 setServiceForEdit({
    ...serviceForEdit,
    image: URL.createObjectURL(file),
 });
 setImageForEdit(file);
  };


  const [categories,setCategories] = useState<Category[]>([])
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesToShow();
        setCategories(response.data.data);
      } catch (error) {
      } finally {
      }
    };
    fetchCategories();
  }, []);


  return (

   


    <>
      <div
        className={`py-12 bg-gray-700 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0`}
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <form
            onSubmit={(e) => handleEditSubmit(e)}
            className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Edit Service
            </h1>
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Service Name
            </label>
            <input
              id="name"
              value={serviceForEdit.serviceName}
              onChange={(e) =>
                setServiceForEdit({
                  ...serviceForEdit,
                  serviceName: e.target.value,
                })
              }
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Category 
            </label>
            <select
              name="category"
              className=" w-full mt-2 p-2 border border-gray-300 rounded"
              value={serviceForEdit.category} 
              onChange={(e) => {
                setServiceForEdit({
                  ...serviceForEdit,
                  category: e.target.value
                });
              }}
            >
              {/* <option value="" defaultChecked> select a category</option> */}
              {categories &&
                categories.map((category, index) => (
                  <option key={index} value={category._id} defaultChecked={serviceForEdit.category == category._id}>
                    {category.catName}
                  </option>
                ))}
            </select>
            <label
              htmlFor="duration"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
            Duration
            </label>
            <input
            type="number"
              id="duration"
              value={serviceForEdit.duration}
              onChange={(e) =>
                setServiceForEdit({
                  ...serviceForEdit,
                  duration: parseInt(e.target.value),
                })
              }
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Price
            </label>
            <input
              id="price"
              type='number'
              value={serviceForEdit.price}
              onChange={(e) =>
                setServiceForEdit({
                  ...serviceForEdit,
                  price:parseInt(e.target.value),
                })
              }
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Description
            </label>
            <textarea cols={10} rows={5}
              id="description"
              value={serviceForEdit.description}
              onChange={(e) =>
                setServiceForEdit({
                  ...serviceForEdit,
                  description: e.target.value,
                })
              }
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="img"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Image
            </label>
            <div className="relative mb-5 mt-2 w-1/2">
              {/* {image ? ( */}
              <div className="image-box mb-2">
                <img
                  src={serviceForEdit.image}
                  alt="Preview Image"
                  className="preview-image"
                />
              </div>
              {/* ) : ( */}
              <input
                type="file"
                id="img"
                name="image"
                // onChange={(e)=>setCategoryForEdit({...categoryForEdit,image:e.target.files[0]})}
                onChange={(e) => handleImageChange(e)}
                accept="image/*"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
              />
              {/* )} */}
            </div>

            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>
              <p
                onClick={() => setEditModal(false)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              >
                Cancel
              </p>
            </div>
            <p
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              aria-label="close modal"
              // onClick={()=>setShowModal(false)}
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditService;

import React, { useEffect, useState } from "react";
import { addService, categoriesToShow } from "../../Api/parlour";
import { toast } from "react-toastify";

interface serviceProps {
  setShowModal(value: boolean): void;
}

const ServiceModal = ({ setShowModal }: serviceProps) => {
  const [services, setServices] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    duration: 0,
    description: "",
    price:0,
    image: [],
  });

  console.log();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await categoriesToShow();
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("serviceName", formData.serviceName);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("duration", formData.duration.toString());
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price",formData.price.toString());
      if (formData.image && formData.image.length > 0) {
        formData.image.forEach((file: File) => {
          formDataToSend.append("image", file);
        });
      }

      console.log("cat",formData);

          const res = await addService(formDataToSend);
          console.log(res);
          if (res.data.data) {
            toast.success("Service added successfully");
            setShowModal(false);
          } else {
            toast.error("Service already exists");
          }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files); // Convert FileList to array
      setFormData({ ...formData, image: selectedImages });
    } else {
      setFormData({ ...formData, image: null });
    }
  };

  const handleCategoryChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
    console.log('ppp',e.target.value)
    setFormData({...formData,category:e.target.value})
  }

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
            onSubmit={handleSubmit}
            className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight text-center mb-4">
              ADD SERVICE
            </h1>
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Service Name
            </label>
            <input
              id="name"
              name="serviceName"
              onChange={(e) =>
                setFormData({ ...formData, serviceName: e.target.value })
              }
              className="mb-0 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Category
            </label>
            <br />
            <select
              name="category"
              className=" w-full mt-2 p-2 border border-gray-300 rounded"
              value={formData.category}
              onChange={handleCategoryChange}
            >
              <option value="" defaultValue={"select a category"}> select a category</option>
              {categories &&
                categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.catName}
                  </option>
                ))}
            </select>
            <br />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Duration (in minutes)
            </label>
            <input
              id="name"
              name="duration"
              placeholder="10 "
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, duration:parseFloat(e.target.value) || 0})
              }
              className="mb-0 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
             Description
            </label>
                      <textarea
            cols={10}
            rows={5} 
            id="description"
            name="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mb-0 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-3 text-sm border-gray-300 rounded border"
/>
<label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
             Price
            </label>
            <input
              id="name"
              name="price"
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
              }
              className="mb-0 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label
              htmlFor="img"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Image
            </label>
            <div className="relative mb-5 mt-2 w-1/2">
              {/* {image ? (
<div className="image-box">
    <img src={URL.createObjectURL(image)} alt="Preview Image"  className="preview-image"  />
</div>
) : ( */}
              <input
                type="file"
                id="img"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
              />
              {/* ) */}
              {/* } */}
            </div>

            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>
              <p
                onClick={() => setShowModal(false)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              >
                Cancel
              </p>
            </div>
            <p
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              aria-label="close modal"
              onClick={() => setShowModal(false)}
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

export default ServiceModal;

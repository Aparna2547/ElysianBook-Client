import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import axios from 'axios';
import Api from '../../../Services/axios';
import { getParlourDetails ,editParlour} from "../../../Api/parlour";

interface FacilityObject {
  facilities: string[]; // Assuming facilities is an array of strings
}

interface FormDataType {
  parlourName: string,
  landMark: string
  locality: string
  district: string
  openingTime: string,
  closingTime: string
  contact:string,
  seats: number,
  latitude: string
  longitude: string
  facilities: string[],
  banners:string[],
}


const EditParlour = () => {
  const [facilities, setFacilities] = useState([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    parlourName: "",
    landMark: "",
    locality: "",
    district: "",
    openingTime: "",
    closingTime: "",
    contact: "",
    seats: 0,
    latitude: "",
    longitude: "",
    facilities: [],
    banners: ["", "", ""],
  });
 const navigate = useNavigate()

  const handleCheckBox = async (facility: string) => {
    const updatedFacilities = checkedItems.includes(facility)
      ? checkedItems.filter((item) => item !== facility)
      : [...checkedItems, facility];
    setCheckedItems(updatedFacilities);
    setFormData({ ...formData, facilities: updatedFacilities });
  };


  useEffect(()=>{
const fetchParlour = async () =>{
  try{
    const res = await getParlourDetails();
    setFormData(res.data.data)
    console.log('jii',res.data.data)
      setCheckedItems(res.data.data.facilities);
      console.log('ao',formData.banners)
  }catch(error){    
    console.log(error)
  }
}
fetchParlour()
  },[])


  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await Api.get("/admin/facilities");
        // console.log(response);
        setFacilities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFacilities();
  }, [formData]);



  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newBanners = [...formData.banners];
      newBanners[index] = file;
      setFormData((prevFormData) => ({
        ...prevFormData,
        banners: newBanners,
      }));
    }
  };
  

  // const api = process.env.REACT_APP_GEOPIFY_API;

  // console.log('api',api)
  const [locationCheckBox, setLocationSetBox] = useState(false);
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      console.log('formdata',formData);

      const formDataToSend = new FormData();
      formDataToSend.append("parlourName", formData.parlourName);
      formDataToSend.append("landmark", formData.landMark);
      formDataToSend.append("locality", formData.locality);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("openingTime", formData.openingTime);
      formDataToSend.append("closingTime", formData.closingTime);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("seats", formData.seats.toString());
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);

      formData.facilities.forEach((facility) => {
        if (typeof facilities !== "string") {
          formDataToSend.append("facilities", facility);
        }
      });
      // formDataToSend.append('facilities', formData.facilities);

      formData.banners.forEach((banner) => {
        if (typeof banner !== "string") {
          formDataToSend.append("banners", banner);
        }
      });


      const res = await editParlour(formDataToSend);
      // console.log(res.data)
      const data = res?.data;
      if (data.status) {
        toast.success("parlour edited");
       navigate('/parlour/parlourDetails')
      }

     
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const fetchCurrentLocation = async (e: any) => {
    try {
      setLocationSetBox(e.target);
      let currentLocation;
      if (!locationCheckBox) {
        console.log("selected");
        navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position);
          const location = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=be59a58f88694f3994f62b14e0211717`
          );
          currentLocation = location.data.results[0];
          console.log(currentLocation);
          console.log(currentLocation.city, currentLocation.road);
          setFormData({
            ...formData,
            landMark: currentLocation.city,
            locality: currentLocation.county,
            district: currentLocation.state_district,
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex'>
      <div>
        <Sidebar/>
      </div>
    <div>
    

    <div className="px-6 w-full">
      <form
        className="  border border-grey p-3 mt-10 "
        onSubmit={handleSubmit}
        encType="multipart/form-data" 
      >
        <h1 className="text-center my-3 font-bold">Parlour Details</h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Parlour Name"
              value={formData.parlourName}
              onChange={(e) =>
                setFormData({ ...formData, parlourName: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="LandMark"
              value={formData.landMark}
              onChange={(e) =>
                setFormData({ ...formData, landMark: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Locality"
              value={formData.locality}
              onChange={(e) =>
                setFormData({ ...formData, locality: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="District"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="time"
              placeholder="Opening Time"
              value={formData.openingTime}
              onChange={(e) =>
                setFormData({ ...formData, openingTime: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="time"
              placeholder="Closin Time"
              value={formData.closingTime}
              onChange={(e) =>
                setFormData({ ...formData, closingTime: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              value={formData.seats}
              onChange={(e) =>
                setFormData({ ...formData, seats: parseInt(e.target.value) })
              }
              placeholder="Total seats Available"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 flex">
            <div className="flex">
              <input
                name="facilitiesx "
                checked={locationCheckBox}
                onChange={(e) => fetchCurrentLocation(e)}
                id="grid-password"
                type="checkbox"
              />{" "}
              <p className="text-black  mx-2">Fetch Current Location</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-3"
            htmlFor="grid-password"
          >
            Select available Faciliteies
          </label>
          <div className="w-full px-3 flex">
            <div className="flex mx-1">
            {facilities.map((facilityObj:FacilityObject, index) => (
            <div key={index}>
              {facilityObj.facilities.map((facility, i) => (
                <React.Fragment key={i}>
                  <input
                    type="checkbox"
                    value={facility}
                    checked={checkedItems.includes(facility)}
                    onChange={() => handleCheckBox(facility)}
                    className='px-2'
                  />
                  <label className='px-2'>{facility}</label>
                </React.Fragment>
              ))}
            </div>
          ))}

            </div>

          
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Select Banners
            </label>
            <div className="flex w-full">
  {formData.banners.map((bannerUrl, index) => (
    <div key={index} className="mb-4">
      <label
        htmlFor={`banner-image-${index + 1}`}
        className="block font-medium"
      >
        Banner Image {index + 1}
      </label>
      <img
        src={bannerUrl}
        alt={`Banner Image ${index + 1}`}
        className="mt-2 max-w-xs"
        style={{height:'200px',width:'300px'}}

      />
      <input
        id={`banner-image-${index + 1}`}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, index)}
        name="banners"
      />
       {bannerUrl && typeof bannerUrl !== "string" && (
                    <img
                      src={URL.createObjectURL(bannerUrl)}
                      alt={`Banner Image ${index + 1}`}
                      className="mt-2 max-w-xs"

                    />
                  )}
    </div>
  ))}
</div>


          </div>
        </div>
        <button className="w-full border border-blue-500 bg-blue-900 p-2 mt-3 text-white font-bold">
          EDIT PARLOUR
        </button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default EditParlour
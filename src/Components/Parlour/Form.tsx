import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addParlour } from "../../Api/parlour";
import Api from "../../Services/axios";
import {useNavigate} from "react-router-dom"


const Form = () => {

  const [facilities, setFacilities] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [formData, setFormData] = useState({
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
  const [images, setImages] = useState("");
 const navigate = useNavigate()

  const handleCheckBox = async (facility: any) => {
    const updatedFacilities = checkedItems.includes(facility)
      ? checkedItems.filter((item) => item !== facility)
      : [...checkedItems, facility];
    setCheckedItems(updatedFacilities);
    setFormData({ ...formData, facilities: updatedFacilities });
  };

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
      newBanners[index] = file; // Store file object directly
      setFormData({ ...formData, banners: newBanners });
    }
  };

  // const api = process.env.REACT_APP_GEOPIFY_API;

  // console.log('api',api)
  const [locationCheckBox, setLocationSetBox] = useState(false);
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      if (formData.parlourName.trim().length === 0) {
        toast.error("Enter parlour name");
        return;
      }
      if (formData.landMark.trim().length === 0) {
        toast.error("Enter the landmark");
        return;
      }
      if (formData.locality.trim().length === 0) {
        toast.error("Enter the locality");
        return;
      }
      if (formData.district.trim().length === 0) {
        toast.error("Enter the district");
        return;
      }
      if (formData.openingTime.trim().length === 0) {
        toast.error("Enter the opening time");
        return;
      }
      if (formData.closingTime.trim().length === 0) {
        toast.error("Enter the closing time");
        return;
      }
      if (formData.contact.trim().length !== 10) {
        toast.error("Enter a 10-digit contact number");
        return;
      }
      if (formData.seats < 0) {
        toast.error("Enter a valid number of seats");
        return;
      }
      if (formData.banners[0] === "") {
        toast.error("Select banners");
        return;
      }else if(formData.banners[0]){
        const fileType = formData.banners[0].type;
        if(!fileType.startsWith('image/')){
          console.log('imsge');
          toast.error('select image')
          return; 
          
      }
      }

      console.log(formData);

      const formDataToSend = new FormData();
      formDataToSend.append("parlourName", formData.parlourName);
      formDataToSend.append("landmark", formData.landMark);
      formDataToSend.append("locality", formData.locality);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("openingTime", formData.openingTime);
      formDataToSend.append("closingTime", formData.closingTime);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("seats", formData.seats);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);

      formData.facilities.forEach((facility) => {
        if (typeof facilities !== "string") {
          formDataToSend.append("facilities", facility);
        }
      });
      // formDataToSend.append('facilities', formData.facilities);

      formData.banners.forEach((banner, index) => {
        if (typeof banner !== "string") {
          formDataToSend.append("banners", banner);
        }
      });


      const res = await addParlour(formDataToSend);
      const data = res?.data;
      if (data.status) {
        toast.success("parlour sent for approval");
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
              {facilities.map((facilityObj, index) => (
                <React.Fragment key={index}>
                  {facilityObj.facilities.map((facility, i) => (
                    <>
                      <input
                        key={i}
                        id="grid-password"
                        type="checkbox"
                        value={facility}
                        checked={checkedItems.includes(facility)}
                        onChange={() => handleCheckBox(facility)}
                      />{" "}
                      <p className="text-gray-500 mx-1">{facility}</p>
                    </>
                  ))}
                </React.Fragment>
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
           
              {formData.banners.map((banner, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={`banner-image-${index + 1}`}
                    className="block font-medium"
                  >
                    Banner Image {index + 1}
                  </label>
                  <input
                    id={`banner-image-${index + 1}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    name="banners"
                  />
                  {banner && typeof banner !== "string" && (
                    <img
                      src={URL.createObjectURL(banner)}
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
          Request Admin For Approval
        </button>
      </form>
    </div>
  );
};

export default Form;

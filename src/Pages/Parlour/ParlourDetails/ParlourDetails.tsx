import { useEffect, useState } from "react";
import Form from "../../../Components/Parlour/Form";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import SinglePageComponent from "../../../Components/SinglePageParlour/SinglePageComponent";
import { getParlourDetails } from "../../../Api/parlour";
import { Link } from "react-router-dom";

type parlourType = {
  parlourName: string;
  landmark: string;
  name: string;
  email: string;
  locality: string;
  openingTime: string;
  closingTime: string;
  facilities: string;
  banners: string;
  status: string;
  contact: number;
};
const ParlourDetails = () => {
  const [parlourDetails, setParlourDetails] = useState<parlourType>(
    {} as parlourType
  );

  useEffect(() => {
    const fetchParlour = async () => {
      try {
        const res = await getParlourDetails();
        setParlourDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParlour();
  }, []);

  return (
    <div className="flex">
      <div className='h-screen'>
        <Sidebar />
      </div>
      {parlourDetails.status == "Registered" ? (
      <div>
        <Form />
        </div>
      ) : (
        <div className="block w-full overflow-y-scroll">
          <SinglePageComponent ParlourDetails={parlourDetails} />
          <Link to="/parlour/editParlour">
            <div className=" mx-3">
              <button className="bg-blue-800 w-full  text-white p-2 font-bold">
                {" "}
                Edit parlour
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ParlourDetails;

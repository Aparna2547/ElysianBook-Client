import React, { useEffect, useState } from "react";
import Form from "../../../Components/Parlour/Form";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import SinglePageComponent from "../../../Components/SinglePageParlour/SinglePageComponent";
import { getParlourDetails } from "../../../Api/parlour";

const ParlourDetails = () => {
  const [parlourDetails, setParlourDetails] = useState({});

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
      <Sidebar />
      {parlourDetails.status == "Registered" ? (
        <Form />
      ) : (

        <SinglePageComponent ParlourDetails={parlourDetails}  />
      )}
    </div>
  );
};

export default ParlourDetails;

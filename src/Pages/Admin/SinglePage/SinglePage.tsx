import  { useEffect, useState } from "react";
import SinglePageComponent from "../../../Components/SinglePageParlour/SinglePageComponent";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import { getParlourDetails } from "../../../Api/admin";
import { useParams } from "react-router-dom";


const SinglePage = () => {
  const [parlourDetails, setParlourDetails] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchParlour = async (id:string) => {
      try {
        const res = await getParlourDetails(id as string);
        setParlourDetails(res.data.data || {})
      } catch (error) {
      }
    };
    if(id){
    fetchParlour(id);
    }
  }, []);
  return (
    <>
    <div className="flex">
      <Home />
      <SinglePageComponent ParlourDetails={parlourDetails}/>
      </div>
    </>
  );
};

export default SinglePage;

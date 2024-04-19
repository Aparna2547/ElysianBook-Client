import React, { useState, lazy, Suspense } from "react";
import Navbar from "../../../Components/User/NavBar/Navbar";
import ParlourList from "../../../Components/User/Sidebar/ParlourList";
import Footer from "../../../Components/User/Footer";
import ParlourCardSkeletion from "../../../Components/Skeletons/ParlourSkeletons";

// const ParlourList = lazy(()=>import('../../../Components/User/Sidebar/ParlourList'))

const ParloursPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Navbar />
      {/* <Suspense fallback={<ParlourCardSkeletion/>}>
      {isLoading ? < ParlourCardSkeletion/> : <ParlourList /> }
    </Suspense> */}

      {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <ParlourList />}
      <Footer />
    </>
  );
};

export default ParloursPage;

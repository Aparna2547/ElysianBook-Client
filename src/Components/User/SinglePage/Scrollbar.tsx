import React, { useRef,useState } from "react";
import "./Scrollbar.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

// interface serviceProps{
//   services:Array<Object>
// }

const Scrollbar = ({services,setCategorySelected}) => {

    const [clicked,setClicked] = useState(0)
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= 100; // Adjust scroll amount as needed
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += 100 ; // Adjust scroll amount as needed
    }
  };



  const handleClick = async (services,index) =>{
    setClicked(index)
    setCategorySelected(services)
  }

  

  return (
    <div className="flex">
      <button
        onClick={scrollLeft}
        className=" p-2 rounded-r-none"
      >
        <MdOutlineKeyboardArrowLeft />
      </button>
     
      <div
        ref={scrollContainerRef}
        className="no-scrollbar overflow-x-scroll flex w-full"
      >
        {services.map((service,index)=>(
      <button key={index} className={`py-1 px-3 text-sm font-bold  rounded-2xl ease-out hover:bg-red-100 me-2 hover:black-white cursor-pointer ${clicked == index ? 'bg-black text-white': 'bg-white text-black'}`} onClick={()=>handleClick(service.services,index)}>
      {service._id[0]}
      </button>
       ))} 
       
        
      </div>

      <button
        onClick={scrollRight}
        className="p-2 rounded-l-none"
      >
        {/* Arrow icon */}
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Scrollbar;

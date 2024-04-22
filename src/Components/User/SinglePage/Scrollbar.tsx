import { useRef,useState } from "react";
import "./Scrollbar.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

// interface ServiceProps{
//   _id:string,
//   services:[string]
// }



interface props{
  services:any;
setCategorySelected:(data:any)=>void

}




const Scrollbar = ({services,setCategorySelected}:props) => {

    const [clicked,setClicked] = useState(0)
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    const container:any = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= 100; // Adjust scroll amount as needed
    }
  };

  const scrollRight = () => {
    const container:any = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += 100 ; // Adjust scroll amount as needed
    }
  };



  const handleClick = async (services:object,index:number) =>{
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
        {services.map((service:any,index:number)=>(
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

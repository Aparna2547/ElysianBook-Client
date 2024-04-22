import { VscClose } from "react-icons/vsc";
               
    type bookingProps={
        setModal(value:boolean):void
    }           


const ViewBooking = ({setModal}:bookingProps) => {
  return (
    <div>
    <div
  className="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
    
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div>
           <button onClick={()=>setModal(false)}> <VscClose />
</button>
                   </div>
        <div className="w-full lg:flex block ">
              {/* {categorySelected.map((service: ServiceProps, index) => ( */}
                <div className=" border-w-gray-200 bg-white rounded  p-3 m-2  w-full border border-gray-200">
                  <div className="flex gap-2 rounded-lg"
                //   key={index} 
                  >
                    <div className="w-1/4">
                      <img
                        // src={service.image}
                        alt="image"
                        className="rounded-lg w-full"
                      />
                    </div>
                    <div className="gap-y-3 w-3/4">
                      <h1 className="text-black font-semibold text-sm">
                        {/* {service.serviceName} */}service
                      </h1>
                      <h3 className="font-bold text-sm">₹price
                      {/* {service.price} */}
                      </h3>
                      <h6 className="flex gap-1 text-sm">
                        {/* <FaClock className="mt-1" /> */}
                        {/* {service.duration} Mins */} duration
                      </h6>
                    </div>
                  </div>
                </div>
            {/* //   ))} */}
            </div>
        </div>
      
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default ViewBooking
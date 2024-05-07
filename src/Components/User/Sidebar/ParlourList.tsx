import { useEffect, useState } from "react";
import { allParlours } from "../../../Api/user";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import parlourLoader from '../../../../public/parlourloader.gif';

type parlour ={
  _id:string
  banners:string,
  parlourName:string,
  landmark:string,
  openingTime:number,
  locality:string,
  closingTime:number,
};

type RootState = {
  auth:{
    location:string
  }
};

const ParlourList = () => {
  const [parlourDetails, setParlourDetails] = useState<parlour[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading,setIsLoading] = useState(true);

  const {location} = useSelector((state:RootState)=>state.auth);
  
  useEffect(() => {
    const fetchParlours = async () => {
      try {
        const res = await allParlours(currentPage,location);
        if(res.data.data.parlours){
          setTimeout(()=>{
              setIsLoading(false);
          },1000);
        }
        setParlourDetails(res.data.data.parlours);
        setTotalPages(res.data.data.totalPages);

      } catch (error) {
      }
    };
    fetchParlours();
  }, [currentPage]);

  return (
    <div>
      <>
        <div className="bg-white">
          <div>
          {isLoading ? (
            <div className="flex  h-screen  justify-center items-center">
              <div className="max-h-screen">
              <img src={parlourLoader} alt="" style={{width:'200px',height:'200px'}}/>
              </div>
            </div>
          ) : (
            <>
            <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 cursor-pointer">
                  Parlours near me
                </h1>
              </div>
              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form >
                    <h3 className="sr-only">Categories</h3>
                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-1"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Main services
                          </span>
                          
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-1">
                        <div className="space-y-4">
                          <div className="flex items-center cursor-pointer">
                            <input
                              id="filter-category-0"
                              name="category[]"
                              defaultValue="new-arrivals"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Bridals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-1"
                              name="category[]"
                              defaultValue="sale"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              PreBridals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-2"
                              name="category[]"
                              defaultValue="travel"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-2"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Facial
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-3"
                              name="category[]"
                              defaultValue="organization"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-3"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Manipadi
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-4"
                              name="category[]"
                              defaultValue="accessories"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Threading
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {parlourDetails.map((parlour) => (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg  cursor-pointer">
                          <Link to={`/parlourDetails/${parlour._id}`} key={parlour._id}>
                            <div className="max-h-44 overflow-hidden">
                              <img
                                className="w-full"
                                src={parlour?.banners[0]}
                                alt="Sunset in the mountains"
                              />
                            </div>
                            <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-1">
                                {parlour.parlourName}
                              </div>
                              <p className="text-gray-700 text-sm">
                                {parlour.landmark},{parlour.locality} <br />
                                Hours: Open ⋅{parlour.openingTime} Closes{" "}
                                {parlour.closingTime} <br />
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </main>
             <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
             <div className="flex flex-1 justify-between sm:hidden">
               <a
                 href="#"
                 className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               >
                 Previous
               </a>
               <a
                 href="#"
                 className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               >
                 Next
               </a>
             </div>
             <div className="hidden sm:flex sm:flex-1 sm:items-center justify-end">
               <div>
                 <nav
                   className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                   aria-label="Pagination"
                 >
                   <button
                     onClick={() => setCurrentPage(currentPage - 1)}
                     disabled={currentPage == 1}
                     className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                   >
                     <span className="sr-only">Previous</span>
                     <svg
                       className="h-5 w-5"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                       aria-hidden="true"
                     >
                       <path
                         fillRule="evenodd"
                         d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                         clipRule="evenodd"
                       />
                     </svg>
                   </button>
                   <p
                     aria-current="page"
                     className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                   >
                     {currentPage}
                   </p>
                   <button
                     onClick={() => setCurrentPage(currentPage + 1)}
                     disabled={totalPages + 1 == currentPage}
                     className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                   >
                     <span className="sr-only">Next</span>
                     <svg
                       className="h-5 w-5"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                       aria-hidden="true"
                     >
                       <path
                         fillRule="evenodd"
                         d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                         clipRule="evenodd"
                       />
                     </svg>
                   </button>
                 </nav>
               </div>
             </div>
           </div>
           </>
          )}
        </div>
        </div>
       
      </>
    </div>
  );
};

export default ParlourList;

import { useEffect, useState } from 'react'
import { allParlours } from '../../../Api/admin'
import {Link} from "react-router-dom"
import Home from '../../../Components/Admin/Sidebar/Sidebarcheck'
import Pagination from "../../../Components/Admin/Pagination"


interface Parlour{
  name:string,
  email:string,
  parlourName:string,
  locality:string,
  status:string,
  _id:string,
}

const ParlourRequest = () => {
  const [parlourDetails,setParlourDetails] = useState<Parlour[]>([])
  const [searchTerm,setSearchTerm] = useState('')
  const [totalPages,setTotalPages] = useState(0)
  const [currentPage,setCurrentPage] = useState(1)


  useEffect(()=>{
   const fetchParlours = async ()=>{
    try {
      const res = await allParlours(searchTerm,currentPage);
      setParlourDetails(res.data.data.showVendors)
      setTotalPages(res.data.data.totalPages)
    } catch (error) {
      
    }
   }
   fetchParlours()
  },[searchTerm,currentPage])



  return (
 <>
   <div className="flex">
        <Home />
        <div className="flex w-full">
          <div className="block w-full">
            <div className='flex justify-between'>
              <div>
              <h1 className="font-bold m-3">PARLOURS</h1>

              </div>
              <div className="pt-2 relative mx-auto text-gray-600 flex justify-end  w-3/4">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Removed unnecessary commented-out <th> */}
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Vendor Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Vendor Email
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Parlour Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Place
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {parlourDetails.length > 0  ? (
                    parlourDetails.filter(parlour => parlour.status=="Pending").map((parlour) => (
                      <tr key={parlour._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{parlour.name}</td> 
                        <td className="px-6 py-4">{parlour.email}</td> 
                        <td className="px-6 py-4">{parlour.parlourName}</td> 
                        <td className="px-6 py-4">{parlour.locality}</td>

                        { parlour.status=="Registered"?(
                          <td>Registered</td>
                      
                        ):(
                          // <Link to={`/admin/parlourRequestApproval/${parlour._id}`}>                    
                          <Link to={`/admin/parlourRequestApproval/${parlour._id}`}>                    
                          <td className="px-6 py-4">
                          <button className="border border-black bg-black text-white font-bold px-2 ">view</button>
                        </td>
                        </Link>
                        )}
                       
                      </tr>
                    ))  
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4">No parlour data found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

          </div>
          
        </div>

      </div>

 </>
  )
}

export default ParlourRequest
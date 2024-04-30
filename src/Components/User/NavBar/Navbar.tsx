// import {useState} from 'react'
import logo from "../../../assets/logo.png"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios"
import {setLocation,setRemoveLocation} from "../../../Store/slice/authSlice"


interface RootState{
    auth:{
        userInfo:string
    }
}
const Navbar = () => {
    // const [isTooltip, setIsTooltip] = useState<Boolean>(false);
//  const [searchQuery, setSearchQuery] = useState('');
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const showNearByPlace = async (searchQuery:any) => {
    //     try {
    //       console.log('searchQuery:', searchQuery);
    //       const encodedSearchQuery = encodeURIComponent(searchQuery);
    //       console.log('encodedSearchQuery:', encodedSearchQuery);
      
    //       const response = await axios.get(
    //         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedSearchQuery}&key=be59a58f88694f3994f62b14e0211717`
    //       );
      
    //       console.log('response:', response);
      
    //       if (response.data.status === 'OK') {
    //         const location = response.data.results[0].geometry.location;
    //         console.log('location:', location);
    //         // You can now use this location to fetch nearby parlours or any other data
    //       } else {
    //         toast.error('Geocode was not successful for the following reason:', response.data.status);
    //       }
    //     } catch (error) {
    //       console.error('Error occurred while fetching data:', error);
    //     }
    //   }

    const showNearBy = async () =>{
        console.log('onclick')
        let currentLocation;
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            const location = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=be59a58f88694f3994f62b14e0211717`
            );
            currentLocation = location.data.results[0];
            console.log(currentLocation);
         dispatch(setLocation(currentLocation.county))

        }
        )
        // setIsTooltip(false)

    }
    const showParlours = async () =>{
        navigate('/parlourlist')
        dispatch(setRemoveLocation())
    }
    return (
        <>
            {/* component */}
            <nav className="bg-pink-100 shadow shadow-gray-300 w-100 px-8 md:px-auto fixed left-0 right-0 top-0 z-50">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* Logo */}
                    <div className="text-indigo-500 md:order-1">
                        {/* Heroicon - Chip Outline */}
                        <img
                            src = {logo}
                            className="h-20 w-20"
                        >

                        </img>
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">
                        
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                            <button onClick={showParlours} >Parlours</button>
                                {/* <Link to="/parlourlist">Parlours</Link> */}
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400 ">
                                <button className='border border-gray-500 px-2 py-1' onClick={showNearBy}><p className='text-sm font-bold flex items-center'><FaLocationDot className='pe-1'/>Show nearby</p></button>
                                
                            </li>
                           
                            {/* <div>
                                <input type="text" onFocus={() => setIsTooltip(true)}
                            //   onBlur={() => setIsTooltip(false)}
                              
                               placeholder='search place' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
                               className='border border-gray-500 px-2 py-1 mt-1'/>
                               <button onClick={()=>showNearByPlace(searchQuery)}
                               className='border border-gray-500 px-2 ms-1 text-lg py-1'><MdOutlineLocationSearching/></button>
                                <div 
                              className={`hs-tooltip ${
                                !isTooltip ? "hidden" : ""
                              }`}
                            >
                              <div className="hs-tooltip-toggle block text-center">
                                <div className=" transition-opacity absolute mt-2 px-3 py-1 z-10 max-w-xs w-64 bg-white border border-gray-100 text-start rounded-xl shadow-m">
                                <div>
                               <button className='flex cursor-pointer'
                                 onClick={showNearBy}><FaLocationDot className='pe-1 mt-1'/>Show nearby</button>
                                </div>
                                </div>
                              </div>
                            </div>
                            </div> */}
                           
                        </ul>
                    </div>
                    {userInfo ? 
                        
                        <div className="order-2 md:order-3">
                        <Link to={'/profilePage'}>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2" 
                        // onClick={logoutHandle}
                        >
                            {/* Heroicons - Login Solid */}
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                /> 
                             </svg> */}
                            {/* <CgProfile/> */}
                            <span>Profile</span>
                        </button>
                        </Link>
                    </div>
                        :
                    <div className="order-2 md:order-3">
                      <Link to={"/login"}>
                        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                            {/* Heroicons - Login Solid */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Login</span>
                        </button>
                        </Link>
                    </div>}
                </div>
            </nav>
        </>

    )
}

export default Navbar

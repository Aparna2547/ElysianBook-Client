import { useState } from "react"
import ProfileDetails from "../../../Components/User/ProfileDetails"
import Navbar from "../../../Components/User/NavBar/Navbar"
import BookingHistory from "../Booking/BookingHistory"
import Footer from "../../../Components/User/Footer"

const Profile = () => {

    const [page, setPage] = useState('profile')

    return (
      <>
      <Navbar/>
        <main className="profile-page">
            <section className="relative block h-500-px m">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            'url("https://t4.ftcdn.net/jpg/01/11/92/63/360_F_111926384_lD1WksOGslwnrpI9xClpRyWdSFN6WHm8.jpg")'
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    />
                </div>
                <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{ transform: "translateZ(0px)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x={0}
                        y={0}
                    >
                        <polygon
                            className="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 min-h-96">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        {/* <img
                                            alt="..."
                                            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        /> */}
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-10 lg:pt-4 pt-8">

                                    </div>
                                </div>
                            </div>

                            <div className=" mt-12 flex flex-col w-full justify-center items-center">
                                <div className="w-full md:w-1/2 flex justify-center font-bold">
                                    <div className={`px-2 pb-1 cursor-pointer ${page == 'profile' && 'border-b-4 border-b-orange-400'}`} onClick={() => setPage('profile')}>
                                        <h1>PROFILE</h1>
                                    </div>
                                    <div className={`px-2 pb-1 cursor-pointer ${page == 'booking' && 'border-b-4 border-b-orange-400'}`} onClick={() => setPage('booking')}>
                                        <h1>BOOKINGS</h1>
                                    </div>
                                    
                                </div>


                                {page === 'profile' ? (
                                    <ProfileDetails />
                                ) : page === 'booking' ? (
                                   <BookingHistory/>
                                ) : null}

                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </main>
        <Footer/>
        </>
    )
}

export default Profile

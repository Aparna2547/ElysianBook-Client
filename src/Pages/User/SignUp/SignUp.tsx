import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { signup } from "../../../Api/user";
import { useNavigate } from "react-router-dom";
import GoogleAuthSignUp from "../../../Components/User/GoogleAuthSignUp";
import Navbar from "../../../Components/User/NavBar/Navbar";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import imageParlour from "../../../assets/water-color-makeup-tool-kit-t-shirt-design_862994-20229.jpg"


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const [confirmPasswordView, setConfirmPasswordView] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;

      if (name.trim().length < 1) {
        toast.error("Enter a valid username");
        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Enter valid email");
        return;
      } else if (
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        (!numberRegex.test(password) && password.trim().length < 6)
      ) {
        toast.error(
          "Password must include at least one uppercase letter, one lowercase letter, and one number And it should be minimum six characters"
        );
        return false;
      } else if (password !== cpassword) {
        toast.error("Passwords don't match");
        return;
      }

      const res = await signup(name, email, password);
      if (!res.data.data) {
        navigate("/verifyOtp");
      }
    } catch (error) {
      console.error(error);
      //   setError("An error occurred during registration");
    }
  };
  return (
    <>
      <Navbar />
      {/* <section className="absolute w-full top-0">
        <div
          className="absolute top-0 w-full h-full"
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2654.jpg")',
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-5/12 px-4 pt-32">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white bg-opacity-60 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      Sign up with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <GoogleAuthSignUp login={false} user={true} />
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign up with credentials</small>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="relative h-10 w-full min-w-[288px] mb-4">
                      <input
                        type="text"
                        id="form1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white shadow focus:outline-none focus:shadow-outline "
                        placeholder=" " 
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Name
                      </label>
                    </div>

                    <div className="relative h-10 w-full min-w-[288px] mb-4">
                      <input
                        type="email"
                        id="form2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white  shadow focus:outline-none focus:shadow-outline"
                        placeholder=" "
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                      </label>
                    </div>

                    <div className="relative h-10 w-full min-w-[288px] mb-4 flex">
                      <input

                        // type="password"
                        type={passwordView ? 'text' :"password"}
                        id="form3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white shadow focus:outline-none focus:shadow-outline "
                        placeholder=" "
                      />
                  <div className='text-xl mt-2 ms-2 cursor-pointer' onClick={() => setPasswordView(!passwordView)}>
                      {passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                     </div>
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                      </label>
                    </div>

                    <div className="relative h-10 w-full min-w-[288px] flex">
                      <input
                        // type="password"
                        type={confirmPasswordView ? 'text' :"password"}
                        id="form4"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white  shadow focus:outline-none focus:shadow-outline "
                        placeholder=" "
                      />
                      <div className='text-xl mt-2 ms-2 cursor-pointer ' onClick={() => setConfirmPasswordView(!confirmPasswordView)}>
                      {confirmPasswordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                     </div>
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Confirm Password
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all 0.15s ease 0s" }}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-6">
                      <div className="w-1/2"></div>
                      <div className="w-1/2 text-right">
                        <Link to={"/login"}>
                          <small>Already have an account</small>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <>
        <div className="flex justify-center items-center min-h-[100vh] flex-wrap gap-5">
          <div className="p-1">
            <img src={imageParlour} width={590} alt="signup" />
          </div>
          <div className="bg-grey-lighter min-h-screen flex flex-col ">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-4">
              <div className="btn-wrapper text-center">
                <GoogleAuthSignUp login={true} user={true} />
              </div>
              <b className="mt-1">OR</b>
              <form
                onSubmit={handleSubmit}
                className="bg-white px-8 py-8 rounded drop-shadow-lg text-black w-[26rem]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1">
                    <h1 className=" text-3xl text-center font-extrabold text-[#3A244A]">
                      Let us know
                    </h1>
                    <h1 className=" text-3xl text-center font-extrabold text-[#D72638]">
                      !
                    </h1>
                  </div>
                  <Link
                    to={"/login"}
                    className="flex gap-1 text-lg font-semibold cursor-pointer underline"
                  >
                    <h1 className="text-[#3A244A]">Sign</h1>
                    <h1 className="text-[#D72638]">In</h1>
                  </Link>
                </div>
                <input
                  type="text"
                  className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                  name="firstName"
                  placeholder="First Name"
                  value={name}
                   onChange={(e) => setName(e.target.value)}
                  
                />
                <input
                  type="email"
                  className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='flex justify-between border border-3 border-gray-500 w-full p-1 rounded mb-4 outline-none'>
                            <input
                                type={passwordView ? 'text' :"password"}
                                className="border-none outline-none click:border-white"
                                name="password"
                                placeholder="Set Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer mt-2  ' onClick={()=>setPasswordView(!passwordView)}>{passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>
                        <div className='flex justify-between border border-3 border-gray-500 w-full p-1 rounded mb-4 outline-none'>
                  <input
                    type={confirmPasswordView ? "text" : "password"}
                    className="border-none outline-none click:border-white"
                    name="confirm_password"
                    placeholder="Retype Password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  <div
                    className="text-2xl cursor-pointer mt-2"
                    onClick={() => setConfirmPasswordView(!confirmPasswordView)}
                  >
                    {confirmPasswordView ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
               
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded-xl bg-[#3A244A] text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SignUp;

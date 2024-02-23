import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { gsignup, userLogin } from "../../Api/user";
import {gParlourSignup,parlourLogin} from "../../Api/parlour"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Store/slice/authSlice";

interface googleAuthProps {
  login: boolean;
  user:boolean
}

const GoogleAuthSignUp = ({ login ,user}: googleAuthProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const gSignUp = async (res: CredentialResponse) => {
    const result: any = jwtDecode(res.credential as string);
    console.log(result);
    const data = {
      name: result.name,
      email: result.email,
      password: "@googleElysianBook",
      isGoogle: true,
    };

 if(user){
    //user login signup
    if (!login) {
        const response = await gsignup(data.name, data.email, data.password);
        console.log(response);
        if (!response.data.data) {
          toast.error("email already exist. Please login");
          navigate("/login");
        } else {
          toast.success("Registration successful. Please login");
          navigate("/login");
        }
      }
      else{
          const response = await userLogin(data.email,data.password)
          console.log(response)
          if(!response.data.success){
              toast.error("User not found. Please sign up")
              navigate('/signup')
          }else{
              toast.success("logged in successfully")
              dispatch(setCredentials(response.data.token))
              navigate('/')
          }
      }
 }
 else{
    //parllour login and signup
    if (!login) {
        const response = await gsignup(data.name, data.email, data.password);
        console.log(response);
        if (!response.data.data) {
          toast.error("email already exist. Please login");
          navigate("/parlour");
        } else {
          toast.success("Registration successful. Please login");
          navigate("/parlour/login");
        }
      }
      else{
          const response = await parlourLogin(data.email,data.password)
          console.log(response)
          if(!response.data.success){
              toast.error("Parlour not found. Please sign up")
              navigate('/parlour/signup')
          }else{
              toast.success("logged in successfully")
              navigate('/parlour/dashboard')
          }
      }
 }
  };
  return (
    <>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={(credentialsResponse) => {
            gSignUp(credentialsResponse);
          }}
          onError={() => {
            console.log("login failed");
          }}
        />
      </div>
    </>
  );
};

export default GoogleAuthSignUp;

import User from "../Pages/Admin/User/User";
import Api from "../Services/axios";
import UserRoutes from "../Services/endpoints/userEndpoints";

export const signup = async (name:string,email:string,password:string)=>{
    try {
        const res = Api.post(UserRoutes.signup,{name,email,password})
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const gsignup = async (name:string,email:string,password:string)=>{
    try {
        const res = await Api.post(UserRoutes.gsignUp,{name,email,password})
        return res;
    } catch (error) {
        
    }
}

export  const userLogin = async (email:string,password:string) =>{
    try {
        const res = await Api.post(UserRoutes.userLogin,{email,password})
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const ForgotPassword = async ( email:string) =>{
    try {
        const res = await Api.post(UserRoutes.forgotPassword,{email})
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const verifyOtpForgotPassword = async(otp:string) =>{
    try {
        const res = await Api.post(UserRoutes.verifyOtpForgotPassword,{otp})
        return res
    } catch (error) {
        console.log(error)
    }
}


export const passwordChange= async (password:string) =>{
    try {
        const res =await Api.post(UserRoutes.changePassword,{password})
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const allParlours = async () =>{
    try {
        const res = await Api.get(UserRoutes.allParlours)
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const userLogout = async ()=>{
    try {
        const res = await Api.post(UserRoutes.userLogout)
        return res
    } catch (error) {
        console.log(error);
        
    }
}
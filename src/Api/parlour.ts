import Api from "../Services/axios";
import parlourRoutes from "../Services/endpoints/vendorEndpoints";

export const signup = async (name:string,email:string,password:string)=>{
    try {
        const res = await Api.post(parlourRoutes.signup,{name,email,password})
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const verifyOtp = async (otp:string)=>{
        try {
            const res = await Api.post(parlourRoutes.otp,{otp})
            console.log(res);
            return res
        } catch (error) {
            console.log(error);
            
        }
    }

    export const login = async (email:string,password:string)=>{
        try {
            const res = await Api.post(parlourRoutes.login,{email,password})
            console.log(res)
            return res
        } catch (error) {
            console.log(error);
            
        }
    }
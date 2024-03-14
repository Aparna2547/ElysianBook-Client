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

    export const parlourLogin = async (email:string,password:string)=>{
        try {
            const res = await Api.post(parlourRoutes.parlourLogin,{email,password})
            console.log(res)
            return res
        } catch (error) {
            console.log(error);
            
        }
    }

    export const gParlourSignup = async (name:string,email:string,password:string)=>{
        try{
            const res = await Api.post(parlourRoutes.gParlourSignup,{name,email,password})
            return res
        }
        catch(error){
            console.log(error);
            
        }
    }

    export const vendorForgotPassword = async ( email:string) =>{
        try {
            const res = await Api.post(parlourRoutes.vendorForgotPassword,{email})
            return res
        } catch (error) {
            console.log(error);
            
        }
    }


    
export const vendorverifyOtpForgotPassword = async(otp:string) =>{
    try {
        const res = await Api.post(parlourRoutes.vendorverifyOtpForgotPassword,{otp})
        return res
    } catch (error) {
        console.log(error)
    }
}

export const vendorChangePassword= async (password:string) =>{
    try {
        const res =await Api.post(parlourRoutes.vendorChangePassword,{password})
        return res
    } catch (error) {
        console.log(error);
        
    }
}


export const addParlour = async (parlour:FormData) =>{
    try{
        const res = await Api.post(parlourRoutes.addParlour,parlour)
        return res
    }catch(error){
        console.log(error)
    }
}



export const getParlourDetails = async ()=>{
    try{
        const res = await Api.get(parlourRoutes.getParlourDetails)
        return res
    }catch(error){
        console.log(error)
    }
}

export const categoriesToShow = async () =>{
    try{
        const res = await Api.get(parlourRoutes.categoriesToShow)
        return res
    }catch(error){
        console.log(error)
    }
}

export const addService = async (formData:FormData) => {
    try {
        const res = await Api.post(parlourRoutes.addService,formData);
        return res
    } catch (error) {
        console.log(error);
        
    }
}


export const vendorLogout = async ()=>{
    try {
        const res  = await Api.post(parlourRoutes.vendorLogout)
        return res
    } catch (error) {
        console.log(error);
        
    }
}



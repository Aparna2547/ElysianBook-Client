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
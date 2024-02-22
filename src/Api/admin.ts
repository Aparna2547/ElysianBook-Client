import Api from "../Services/axios";
import AdminRoutes from "../Services/endpoints/adminEndpoints";

export const login = async (email:string,password:string)=>{
    try {
        const res = await Api.post(AdminRoutes.login,{email,password})
        console.log(res);
        return res
        
    } catch (error) {
        console.log(error);
        
    }
}

export const addCategory = async(category:FormData) =>{
try {
    const res = await Api.post(AdminRoutes.addCategory,category)
    return res
} catch (error) {
    console.log(error);
    
}
}

export const editCategory = async(id:string) =>{
    try {
        const res = await Api.post(AdminRoutes.editCategory,id)
        return res
    } catch (error) {
        console.log(error);
        
    }
}

// export const category = async(category:FormData)=>{
//     try {
//         const res = await Api.get(AdminRoutes.category,category)
//     } catch (error) {
//         console.log(error);
        
//     }
// }

export const hideCategory = async (id:string)=>{
    try {
        const res = await Api.put(`${AdminRoutes.hideCategory}?id=${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}
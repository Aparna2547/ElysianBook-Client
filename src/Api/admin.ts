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


export const listUser = async(id:string)=>{
    try {
        const res = await Api.put(`${AdminRoutes.listUser}?id=${id}`)
        console.log('kii',id);
        
        return res;
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

export const editCategory = async(id:string,formData:FormData) =>{
    try {
        const res = await Api.put(`${AdminRoutes.editCategory}?id=${id}`,formData)
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


// export const allFacilities = async() =>{
//     try {
//         const res = await Api.get(AdminRoutes.allFacilities)
//         return res
//     } catch (error) {
//         console.log(error);
        
//     }
// }

export const addFacility =  async (facility:string)=>{
    try {
        const res = await Api.post(AdminRoutes.addFacility,{facility})
        return res
    } catch (error) {
        console.log(error);
        
    }
}


export const allParlours = async ()=>{
    try {
        const res = await Api.get(AdminRoutes.allParlours)
        return res
    } catch (error) {
        console.log(error);
        
    }
}

export const getParlourDetails = async (id:string) =>{
    try {
        const res = await Api.get(`${AdminRoutes.singleParlour}?id=${id}`)
        return res
    } catch (error) {
     console.log(error)   
    }
}



export const ParlourRequestConfirmation = async (value:string,id:string) =>{
        try{
        const response  = await Api.post(AdminRoutes.parlourRequestConfirmation,{value,id})
        return response;
        }catch(error){
            console.log(error)
        }
} 
export const adminLogout = async ()=>{
    try{
        const res = await Api.post(AdminRoutes.adminLogout)
        return res
    }catch(error){
        console.log(error);
        
    }
}

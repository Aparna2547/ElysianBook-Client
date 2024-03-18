import Api from "../Services/axios";
import AdminRoutes from "../Services/endpoints/adminEndpoints";
import errorHandle from "../Api/errorHandle"

export const login = async (email:string,password:string)=>{
    try {
        const res = await Api.post(AdminRoutes.login,{email,password})
        console.log(res);
        return res
        
    } catch (error) {
        console.log(error);
        errorHandle(error)
        
    }
}


export const listUser = async(id:string)=>{
    try {
        const res = await Api.put(`${AdminRoutes.listUser}?id=${id}`)
        console.log('kii',id);
        
        return res;
    } catch (error) {
        console.log(error);
        errorHandle(error as Error)
    }
}


export const addCategory = async(category:FormData) =>{
try {
    const res = await Api.post(AdminRoutes.addCategory,category)
    return res
} catch (error) {
    console.log(error);
    errorHandle(error as Error)

    
}
}

export const editCategory = async(id:string,formData:FormData) =>{
    try {
        const res = await Api.put(`${AdminRoutes.editCategory}?id=${id}`,formData)
        return res
    } catch (error) {
        console.log(error);
        errorHandle(error as Error)

    }
}

export const allCategory = async(search:string,page:number)=>{
    try {
        const res = await Api.get(`${AdminRoutes.allCategory}?search=${search}&page=${page}`)
        return res
    } catch (error) {
        console.log(error);
        errorHandle(error as Error)

    }
}

export const hideCategory = async (id:string)=>{
    try {
        const res = await Api.put(`${AdminRoutes.hideCategory}?id=${id}`)
        return res
    } catch (error) {
        console.log(error)
        errorHandle(error as Error)

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
        errorHandle(error as Error)

        
    }
}


export const allParlours = async (search:string,page:number)=>{
    try {
        const res = await Api.get(`${AdminRoutes.allParlours}?search=${search}&page=${page}`)
        return res
    } catch (error) {
        console.log(error);
        errorHandle(error as Error)
    }
}

export const getParlourDetails = async (id:string) =>{
    try {
        const res = await Api.get(`${AdminRoutes.singleParlour}?id=${id}`)
        return res
    } catch (error) {
     console.log(error)  
     errorHandle(error as Error)

    }
}



export const ParlourRequestConfirmation = async (value:string,id:string) =>{
        try{
        const response  = await Api.post(AdminRoutes.parlourRequestConfirmation,{value,id})
        return response;
        }catch(error){
            console.log(error)
        errorHandle(error as Error)

        }
} 
export const adminLogout = async ()=>{
    try{
        const res = await Api.post(AdminRoutes.adminLogout)
        return res
    }catch(error){
        console.log(error);
        errorHandle(error as Error)

        
    }
}

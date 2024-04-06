import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
    parlourInfo: localStorage.getItem('parlourInfo') ? JSON.parse(localStorage.getItem('parlourInfo') as string) : null,
    userId : localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId') as string) : null,
    parlourId : localStorage.getItem('vendorId') ? JSON.parse(localStorage.getItem('vendorId') as string) : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state) =>{
            state.userInfo=null
            localStorage.removeItem('userInfo')
        },
        setAdminCredentials:(state,action)=>{
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogout:(state) =>{
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        },
        setParlourCredentials:(state,action)=>{
            state.parlourInfo = action.payload
            localStorage.setItem('parlourInfo',JSON.stringify(action.payload))
        },
        parlourLogout:(state) =>{
            state.parlourInfo = null
            localStorage.removeItem('parlourInfo')
        },
        setUserId:(state,action) =>{
            state.userId = action.payload
            localStorage.setItem('userId',JSON.stringify(action.payload))
        },
        setParlourId:(state,action) =>{
            state.parlourId = action.payload
            localStorage.setItem('vendorId',JSON.stringify(action.payload))
        }
    }
})

export const {setCredentials,logout,setAdminCredentials,adminLogout,setParlourCredentials,parlourLogout,setUserId, setParlourId} = authSlice.actions
export default authSlice.reducer
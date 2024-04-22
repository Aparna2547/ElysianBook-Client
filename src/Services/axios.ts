import axios from 'axios'
const Api:any = axios.create({baseURL:import.meta.env.VITE_APP_BASEURL,withCredentials:true})

export default Api


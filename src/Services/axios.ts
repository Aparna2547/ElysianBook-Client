import axios from 'axios'
const Api:any = axios.create({baseURL:'http://localhost:3000/api',withCredentials:true})

export default Api


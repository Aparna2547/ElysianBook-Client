import axios from 'axios'
const Api:any = axios.create({baseURL:'http://127.0.0.1:5000/api',withCredentials:true})

export default Api


import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

api.interceptors.request.use(
    async config =>{
        const accessToken = JSON.parse (localStorage.getItem('accessToken'))
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    async error =>{
        if(error.response.status == 400 && error?.response?.data.JWT == false){
             alert("session has been expired please login again")
             localStorage.removeItem('accessToken')
             localStorage.removeItem('userInfo')
                window.location.href = '/'  
                return  
        }
    }
)

export default api
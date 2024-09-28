import api from "../services/axios";


export const signUp = async (userData) =>{
    try {
        const result = await api.post('/signup',{userData})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const login = async (email,password) =>{
    try {
        const result = await api.post('/login',{email,password})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const addTask = async(taskData)=>{
    try {
        const result = await api.post('/addtask',{taskData})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const fetchtasks = async()=>{
    try {
        const result = await api.get('/getTasks')
        return result
    } catch (error) {
        console.error(error)
    }
}

export const fetchTaskToEdit = async (taskId) =>{
    try {
        const result = await api.post('/getTaskToEdit',{taskId})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const submitTaskEdit = async (taskId,taskEditedData)=>{
    try{
        const result = await api.post('/editTask',{taskId,taskEditedData})
        return result
    }catch(error){
        console.error(error.message)
    }
}

export const deleteTask = async (taskId) => {
    try {
        const result = await api.post('/deleteTask',{taskId})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const CompleteTask = async (taskId) =>{
    try {
        const result = await api.post('/completeTask',{taskId})
        return result
    } catch (error) {
        console.error(error)
    }
}

export const completedTasks = async () =>{
    try {
        const result = await api.get('/completedTasks')
        return result
    } catch (error) {
        console.error(error)
    }
}

export const fetchTaskStats = async () =>{
    try {
        const result = await api.get('/stats')
        return result
    } catch (error) {
        console.error(error)
    }
}
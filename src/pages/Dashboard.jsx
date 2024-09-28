import React, { useEffect, useState } from 'react'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { addTask } from '../api/userApi'
import { toast, Toaster } from 'sonner'


function Dashboard() {
  const [minDate,setMinDate] = useState('')
  const [taskName,setTaskName] = useState('')
  const [dueDate,setDueDate] = useState('')
  const [description,setDescription] = useState('')

  function reset(){
    setTaskName('')
    setDueDate('')
    setDescription('')
  }

  useEffect(()=>{
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  },[])



  const taskSubmission = async (e) =>{
    e.preventDefault()
    const taskData = {
      taskName,
      dueDate,
      description
    }
    if(!taskName.trim || !dueDate.trim() || !description.trim()){
      return toast.error("Fields can't be empty")
    }
    const response = await addTask(taskData)
    reset()
    if(response?.data?.success){
       return toast.success("Task has been added")
    }else if(response.data.sameTask){
      return toast.error("Same task is existing")
    }
  }

  return (
   <>
   <UserNavBar/>
   <UserSideBar/>
   <Toaster richColors position='bottom-right'/>
   <form className="mt-20 w-full max-w-lg mx-auto" onSubmit={taskSubmission}>
    <div className="card font-montserrat text-sm mt-12 shadow-2xl bg-white p-6 rounded-lg">
        <div className="chat-header text-lg font-semibold mb-4">Add your task</div>

        <div className="flex flex-col mb-4">
            <label className="p-2 text-xs" htmlFor="task name">Enter your task name</label>
            <input 
                onChange={(e) => setTaskName(e.target.value)} 
                value={taskName} 
                className="focus:outline-none border p-2 h-10 rounded-md" 
                placeholder="Task Name"
            />
        </div>

        <div className="flex flex-col text-xs mb-4">
            <label className="p-2" htmlFor="duedate">Add due date</label>
            <input 
                onChange={(e) => setDueDate(e.target.value)} 
                value={dueDate} 
                type="date" 
                min={minDate} 
                className="focus:outline-none border p-2 h-10 rounded-md"
            />
        </div>

        <div className="flex flex-col mb-4">
            <label className="p-2 text-xs" htmlFor="description">Add your description</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                className="focus:outline-none border p-2 h-24 rounded-md resize-none" 
                placeholder="Type your description here"
            />
        </div>

        <div className="flex justify-end">
            <button className="send-button bg-gradient-to-tr from-black to-blue-900 hover:to-blue-700 text-white py-2 px-4 rounded-md transition duration-500">
                Submit
            </button>
        </div>
    </div>
</form>

   </>
  )
}

export default Dashboard
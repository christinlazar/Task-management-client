import React, { useEffect, useState } from 'react'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { completedTasks, CompleteTask, deleteTask, fetchtasks, fetchTaskToEdit, submitTaskEdit } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import {createPortal} from 'react-dom'
import { toast, Toaster } from 'sonner'
import {io} from 'socket.io-client'
const socket = io('http://localhost:5000')

function Tasks() {
    const [taskData,setTaskData] = useState([])
    const [editPortal,setEditPortal] = useState(false)
    const [isOverlayVisible,setIsOverlayVisible] = useState(false)
    const navigate = useNavigate()
    const [minDate,setMinDate] = useState('')
    const [taskName,setTaskName] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [description,setDescription] = useState('')
    const [TaskId,setEditingTaskId] = useState('')
    const [refresh,setRefresh] = useState(false)
 
    useEffect(()=>{
        async function fetchTaskData(){
            const response = await fetchtasks()
            console.log(response.data)
            if(response?.data.success){
                setTaskData(response?.data?.taskData)
            }
        }
        
        fetchTaskData()
       

        socket.on('taskUpdated', (updatedTask) => {
            setTaskData((prevTasks) =>
              prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
            return toast.success('Task was updated!');
        });
    
        socket.on('deletedTask',(tasks)=>{
            if(tasks != null){
            setTaskData(tasks)
            }
        })
    
        socket.on('taskAdded',(tasks)=>{
            setTaskData(tasks)
        })
    
        socket.on('completed',(allTasks)=>{
            setTaskData(allTasks)
            toast.success("Task has been marked as completed")
        })
        
        return ()=>{
            socket.off('taskUpdated')
            socket.off('deletedTask')
            socket.off('completed')
            socket.off('taskAdded')
            // setRefresh(false)
        }
    },[editPortal,refresh])

    // socket.on('taskUpdated', (updatedTask) => {
    //     setTaskData((prevTasks) =>
    //       prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    //     );
    //     return toast.success('Task was updated!');
    // });

    // socket.on('deletedTask',(tasks)=>{
    //     setTaskData(tasks)
    // })

    // socket.on('taskAdded',(tasks)=>{
    //     console.log("tasksss",tasks)
    //     setTaskData(tasks)
    // })

    // socket.on('completed',(allTasks)=>{
    //     setTaskData(allTasks)
    //     toast.success("Task has been marked as completed")
    // })


    

    

    const editPortalSetting = async (taskId) =>{
        const response  = await fetchTaskToEdit(taskId)
        if(response.data.success){
            setEditingTaskId(taskId)
            setTaskName(response.data.taskToEdit.taskName)
            setDueDate(response.data.taskToEdit.dueDate)
            setDescription(response.data.taskToEdit.description)
        }
        console.log(taskName,dueDate,description)
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
        setEditPortal(true)
        setIsOverlayVisible(true)
    }
    const closeEditPortal = () =>{
        setEditPortal(false)
        setIsOverlayVisible(false)
        setMinDate('')
        setEditingTaskId('')
    }
    const taskEditSubmission = async (e) =>{
        e.preventDefault()
        if(!taskName.trim() || !dueDate.trim() || !description.trim()){
            return toast.error("Fields cant be empty")
        }
        if(taskName.length > 50){
            return toast.error("Name field can't be this long")
        }
        const taskEditedData = {
            taskName,
            dueDate,
            description
        }
        const response = await submitTaskEdit(TaskId,taskEditedData)
        if(response?.data?.success){
            setTimeout(() => {
                setEditPortal(false)
                setIsOverlayVisible(false)
                setMinDate('')
                setEditingTaskId('')
            }, 3000);
        }
    }

    const DeleteTask = async (taskId)=>{
        const response = await deleteTask(taskId)
        if(response.data.success){
            toast.success("Deleted successfully")
        }
    }
    
    const completeTask = async (e,taskId)=> {
        if(e.target.checked){
            const response = await CompleteTask(taskId)
            if(response.data.success){
                // toast.success("Task has been marked as completed")
                // setRefresh(true)
            }
        }
    } 
  return (
    <>
    <UserNavBar/>
    <UserSideBar/>
    <Toaster richColors position='bottom-right'/>
    {isOverlayVisible && (
          <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
        )}
    <div classNameName="custom-card font-montserrat ms-96 text-sm mt-14 border">
    <div className="max-w-[720px] mx-auto">
    
    <div className="block mt-16 mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
       <a className='block w-full px-4 py-2 text-center text-slate-700 transition-all '>
               Check up on your   <b>shared tasks</b>.
           </a>
   </div>

   <div className="relative flex flex-col w-[860px] h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
       <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
           <div className="flex items-center justify-between ">
               <div>
                   <h3 className="text-lg font-semibold text-slate-800">Tasks List</h3>
                   <p className="text-slate-500">Review each task </p>
               </div>
           <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            
               <button
               onClick={()=>navigate('/dashboard')}
               className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
               type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 9.75l-3.75 3.75-1.5-1.5M20.25 6.75h-16.5A2.25 2.25 0 001.5 9v12.75A2.25 2.25 0 003.75 24h16.5A2.25 2.25 0 0022.5 21.75V9A2.25 2.25 0 0020.25 6.75zM20.25 3h-3a.75.75 0 010-1.5h3a.75.75 0 010 1.5z" />
</svg>

               Add task
               </button>
           </div>
           </div>
       
       </div>
       <div className="p-0 ">
           <table className="w-full mt-4 text-left table-auto ">
           <thead>
               <tr>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    Task Name
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                   Due Date
                  
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                   Status
                 
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                   description
                 
                   </p>
               </th>
             
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Edit task
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Delete task
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Complete task
                   </p>
               </th>
               </tr>
           </thead>
           <tbody>
           {
            taskData.length > 0 ? taskData.map((task)=>(
                <tr>
               <td className="p-4 border-b border-slate-200">
                   <div className="flex items-center gap-3">
                 
                   <div className="flex flex-col">
                       <p className="text-sm font-semibold text-slate-700">
                       {task.taskName}
                       </p>
                       <p
                       className="text-xs text-slate-500">
                       complete tasks ASAP!
                       </p>
                   </div>
                   </div>
               </td>
               <td className="p-4 border-b border-slate-200">
                   <div className="flex flex-col">
                   <p className="text-sm font-semibold text-slate-700">
                       {task.dueDate}
                   </p>
                
                   </div>
               </td>
               <td className="p-4 border-b border-slate-200">
                   <div className="w-max">
                    {
                        task.status == 'pending'? 
                        <div  
                        className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-orange-800 uppercase rounded-md select-none whitespace-nowrap bg-orange-500/20">
                        <span className="">{task.status}</span>
                    </div> :
                          <div  
                          className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                          <span className="">{task.status}</span>
                      </div>
                    }
                   </div>
               </td>
               <td className="p-4 border-b border-slate-200">
                   <p className="text-sm text-slate-500">
                  {task.description.substring(0,10)}...
                   </p>
               </td>
             
               <td className="p-4 border-b border-slate-200">
                    
                    {
                        task.status == 'completed' ? 
                        <button onClick={()=>toast.error("Task has been completed")} 
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-4 h-4">
                            <path
                                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                            </path>
                            </svg>
                        </span>
                        </button> :
                        <button onClick={()=>editPortalSetting(task._id)} 
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                            className="w-4 h-4">
                            <path
                                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                            </path>
                            </svg>
                        </span>
                        </button>

                    }
                  
               </td>
               <td className="p-4 border-b border-slate-200">
                   <button
                   onClick={()=>DeleteTask(task._id)}
                   className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                   type="button">
                   <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
  <path d="M6 7h12v12.75A2.25 2.25 0 0115.75 22H8.25A2.25 2.25 0 016 19.75V7zm13.5-2.25V5H4.5v-.25A.75.75 0 015.25 4h13.5a.75.75 0 01.75.75zM9 2.25A.75.75 0 009.75 2h4.5a.75.75 0 01.75.75V3H9v-.75zM7.5 9.75a.75.75 0 011.5 0v8.25a.75.75 0 01-1.5 0V9.75zm7.5 0a.75.75 0 011.5 0v8.25a.75.75 0 01-1.5 0V9.75z" />
</svg>

                   </span>
                   </button>
               </td>
               <td className="p-4 border-b border-slate-200">
                {
                    task.status == 'pending' ? 
                    <p className="text-sm text-slate-500">
                    <input onChange={(e)=>completeTask(e,task._id)} type='checkbox'></input>
                   </p> :
                    <p className="text-sm text-slate-500">
                    <input  type='checkbox' checked></input>
                   </p>

                }
               </td>
               </tr>
            )):(<></>)
           }
                    

           </tbody>
           </table>
       </div>
       </div>
    
</div>
{editPortal && createPortal(
  <div 
    className='z-40 max-h-[90vh] max-w-[100vw] w-full md:w-[40%] shadow-2xl border border-gray-500 border-opacity-50 rounded-xl p-6'
    style={{ 
      color: 'black', 
      backgroundColor: 'white', 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)' 
    }}
  >
    <p className='font-montserrat font-bold text-xl text-center text-cyan-900 mb-4'>Task</p>
    <div className='flex flex-col'>
      <form onSubmit={taskEditSubmission}>
        <div className="card font-montserrat text-sm shadow-2xl">
          <div className="chat-header mb-4">Add your task</div>

          <div className='flex flex-col mb-4'>
            <label className='p-2 text-xs' htmlFor='task-name'>Enter your task name</label>
            <input 
              onChange={(e)=>setTaskName(e.target.value)} 
              value={taskName} 
              id="task-name"
              className='focus:outline-none border p-2 h-10' 
              placeholder="Task name"
            />
          </div>

          <div className='flex flex-col text-xs mb-4'>
            <label className='p-2' htmlFor='due-date'>Add due date</label>
            <input 
              onChange={(e)=>setDueDate(e.target.value)} 
              value={dueDate} 
              id="due-date"
              type='date' 
              min={minDate} 
              className='focus:outline-none border p-2 h-10'
            />
          </div>

          <div className='flex flex-col mb-4'>
            <label className='p-2 text-xs' htmlFor='description'>Add your description</label>
            <input 
              onChange={(e)=>setDescription(e.target.value)} 
              value={description} 
              id="description"
              type="text" 
              className='focus:outline-none border p-2 h-10' 
              placeholder="Description"
            />
          </div>

          <button className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-900 transition duration-200 w-full">
            Submit Task
          </button>
        </div>
      </form>
    </div>

    <button 
      className='rounded-full text-xs text-center w-20 h-10 bg-blue-900 bg-opacity-90 text-white mt-5 transition duration-200'  
      onClick={closeEditPortal}
    >
      Close
    </button>
  </div>,
  document.body
)}

    </div>

    </>
  )
}

export default Tasks
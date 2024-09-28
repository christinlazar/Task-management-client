import React, { useEffect, useState } from 'react'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { Toaster } from 'sonner'
import { completedTasks } from '../api/userApi'
import {io} from 'socket.io-client'
const socket = io('http://localhost:5000')

function CompletedTasks() {
    const [taskData,setTaskData] = useState([])
    useEffect(()=>{
        const fetchCompletedTaks = async ()=>{
            const response = await completedTasks()
            if(response.data.success){
                setTaskData(response.data.completedTasks)
            }
        }
        fetchCompletedTaks()
        
    socket.on('taskCompleted',(completedTasks)=>{
        setTaskData(completedTasks)
    })

    socket.on('tasksForCompleted',(completedTasks)=>{
        if(completedTasks != null){
        setTaskData(completedTasks)
        }
    })

    return ()=>{
        socket.off('taskCompleted')
        socket.off('tasksForCompleted')
    }

    },[])


    // socket.on('taskDeleted',(tasks)=>{
    //     setTaskData(tasks)
    // })

  

  return (
    <>
     <UserNavBar/>
    <UserSideBar/>
    <Toaster richColors position='bottom-right'/>
    <div classNameName="custom-card font-montserrat ms-96 text-sm mt-14 border">
    <div className="max-w-[720px] mx-auto">
    
    <div className="block mb-4 mt-16 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
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
               
               className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
               type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 9.75l-3.75 3.75-1.5-1.5M20.25 6.75h-16.5A2.25 2.25 0 001.5 9v12.75A2.25 2.25 0 003.75 24h16.5A2.25 2.25 0 0022.5 21.75V9A2.25 2.25 0 0020.25 6.75zM20.25 3h-3a.75.75 0 010-1.5h3a.75.75 0 010 1.5z" />
</svg>
               Completed tasks
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
                        <button  
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
                        <button 
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
                    <input  type='checkbox'></input>
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


    </div>
    </>
   
  )
}

export default CompletedTasks
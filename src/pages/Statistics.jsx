import React, { useEffect, useState } from 'react'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { fetchTaskStats } from '../api/userApi'
import {Bar} from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

function Statistics() {
    const [isLoading,setIsLoading] = useState(false)
    const [stats,setStats] = useState({
        completedTasks:0,
        pendingTasks:0,
        overDueTasks:0
    })

    useEffect(()=>{
        async function fetchStats(){
            const response = await fetchTaskStats()
            if(response?.data){
                console.log(response.data)
                setStats(response?.data)
                setIsLoading(true)
            }
        }
        fetchStats()
    },[])
    console.log("stats",stats)

    const data ={
        labels:['Task Completed', 'Task pending','Task over-due'],
        datasets:[
            {
                label:'Task Statistics',
                data:[
                    stats.completedTasks ?? 0,
                    stats.pendingTasks ?? 0,
                    stats.overDueTasks ?? 0
                ],
                backgroundColor: ['#34495e', '#ffcc80', '#FF0000'],
            }
        ]
    }

  return (
    <div>
        <UserNavBar/>
        <UserSideBar/>
        <div className=' ms-48 ps-44 pe-44 pt-16'>
            <h2 className=''>STATISTICS</h2>
            {
                isLoading && (
                     <Bar data={data}/>
                )
            }
        </div>
    </div>
  )
}

export default Statistics
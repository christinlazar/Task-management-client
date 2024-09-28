import React from 'react'
import { useSelector, } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserLoggedIn = () =>{
    const userInfo = useSelector((state)=>state.auth.userInfo)
    return (
        userInfo ? <Outlet/> : <Navigate to='/'/>
    )
}


export default UserLoggedIn
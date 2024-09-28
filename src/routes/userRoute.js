import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Tasks'
import CompletedTasks from '../pages/CompletedTasks'
import UserLoggedOut from '../components/user/UserLoggedOut'
import UserLoggedIn from '../components/user/userLoggedIn'
import Statistics from '../pages/Statistics'
function UserRoute() {
  return (
    <Routes>
      <Route path='' element={<UserLoggedOut/>}>
        <Route path='/'  element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Route>
      <Route path='' element={<UserLoggedIn/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/completed' element={<CompletedTasks/>}/>
        <Route path='/statistics' element={<Statistics/>}/>
      </Route>
    </Routes>
  )
}

export default UserRoute
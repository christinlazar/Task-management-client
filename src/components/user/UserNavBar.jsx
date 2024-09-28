import React from 'react'
import { deleteUserCredentials } from '../../store/slice/AuthSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
function UserNavBar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const logOut = () =>{
		dispatch(deleteUserCredentials())
		navigate('/')
		localStorage.removeItem('accessToken')
	}
  return (
   <>
<nav className="bg-white shadow shadow-gray-300 w-full px-4 md:px-8">
	<div className="h-16  container flex items-center justify-between flex-wrap">
	
		<div className="flex-grow md:flex-grow-0">
			
		</div>
		
		<div className="order-2 md:order-3 w-full md:w-auto">
			<ul className="flex font-semibold justify-between items-center space-x-4 md:space-x-6">
				<li onClick={logOut} className="text-blue-900 hover:underline">
					<a href="">Log Out</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
   </>
  )
}

export default UserNavBar
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { login } from '../api/userApi';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../store/slice/AuthSlice';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function reset(){
    setEmail('')
    setPassword('')
  }
  const handleLogin = async (e) => {
   try {
        e.preventDefault()
        if(email.trim() == ''){
            return toast.error(`Email field can't be empty`)
        }
        if(password.trim() == ''){
            return toast.error(`password field can't be empty`)
        }

        const response = await login(email,password)
        reset()
      console.log('res',response)
        if(response?.data?.success){
            dispatch(setUserCredentials(response?.data.accessToken))
            localStorage.setItem('accessToken',JSON.stringify(response.data.accessToken))
            navigate('/dashboard')
        }else if(response.data.passwordIncorrect){
            return toast.error("Invalid user credentials")
        }
   } catch (error){
        console.error(error)
   }
  };

  return (
    <>
    <Toaster richColors position='bottom-right'/>
    <div className="h-screen bg-gradient-to-br from-black to-blue-900 flex justify-center items-center w-full">
        <form method='POST' onSubmit={handleLogin} className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white px-6 py-8 sm:px-10 rounded-xl shadow-xl w-full">
                <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold text-black">Login</h1>
                    <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                        <input 
                            onChange={(e)=>setEmail(e.target.value)} 
                            className="pl-2 text-sm outline-none border-none w-full" 
                            type="email" 
                            name="email" 
                            value={email} 
                            placeholder="Email" 
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-md">
                        <input 
                            onChange={(e)=>setPassword(e.target.value)} 
                            className="pl-2 text-sm outline-none border-none w-full" 
                            type="password" 
                            name="password" 
                            value={password} 
                            placeholder="Password" 
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    value="login" 
                    id="login" 
                    className="mt-6 w-full shadow-xl bg-gradient-to-tr from-black to-blue-900 hover:to-blue-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
                >
                    Login
                </button>
                <div className="flex justify-center items-center mt-4">
                    <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2">
                            You don't have an account?
                            <Link to={'/signup'} className="text-xs ml-2 text-blue-500 font-semibold">signup</Link>
                        </span>
                    </p>
                </div>
            </div>
        </form>
    </div>
</>

    
  );
}

export default Login;
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast, Toaster} from 'sonner'
import { signUp } from '../api/userApi';
function SignUp() {
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password, setPassword] = useState('');
  const [confrimPwd,setConfirmPwd] = useState('')

  const reset = () =>{
     setUsername('')
     setEmail('')
     setPhone('')
     setPassword('')
    setConfirmPwd('')
  }

  const handleSignUp = async(e) => {
    try {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const phoneRegex = /^\d{10}$/;
        const passwordRegex =  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]).{8,}$/;
        e.preventDefault()
        if(!username.trim() && !email.trim() && !phone.trim() && !password.trim() && !confrimPwd.trim()){
            return toast.error("fields cant be empty")
        }
        if(username.trim() == ''){
            return toast.error(`name field can't be empty`)
        }
        if(email.trim() == ''){
            return toast.error(`email can't be empty`)
        }
        if(!emailRegex.test(email)){
            return toast.error(`Email format is not correct`)
        }
        if(!phoneRegex.test(phone)){
            return toast.error("Phone number is not valid")
        }
        if(!passwordRegex.test(password)){
            return toast.error('password should contain atleast one special character,one number,and alphanbets')
        }
        if(password.trim()== ''){
            return toast.error(`password can't be empty`)
        }
        if(confrimPwd.trim() == ''){
            return toast.error(`confirm password can't be empty`)
        }
        if(password != confrimPwd){
            return toast.error(`passwords must be matching`)
        }
        const userData = {
            name:username,
            email:email,
            phone:phone,
            password:password,
        }

        const response = await signUp(userData)
        console.log(response.data)
        reset()
        if(response.data.success){
            return toast.success("User registration has been completed successfully")
        }
        else if(response.data.userExists){
            return toast.error("User already exists")
        }
        else{
            return toast.error("something went wrong")
        }
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 flex justify-center items-center w-full">
    <Toaster richColors position='bottom-right'/>
    <form onSubmit={handleSignUp} method='POST' className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white px-6 py-8 sm:px-10 rounded-xl shadow-xl w-full">
            <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-black">Signup</h1>

                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <input 
                        onChange={(e)=>setUsername(e.target.value)} 
                        className="pl-2 outline-none text-sm border-none w-full" 
                        type="text" 
                        name="name" 
                        value={username} 
                        placeholder="Name" 
                    />
                </div>
                
                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        className="pl-2 outline-none text-sm border-none w-full" 
                        name="email" 
                        value={email} 
                        placeholder="Email" 
                    />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <input 
                        onChange={(e)=>setPhone(e.target.value)} 
                        className="pl-2 outline-none text-sm border-none w-full" 
                        type="tel" 
                        name="phone" 
                        value={phone} 
                        placeholder="Phone Number" 
                    />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        className="pl-2 text-sm outline-none border-none w-full" 
                        type="password" 
                        name="password" 
                        value={password} 
                        placeholder="Password" 
                    />
                </div>

                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <input 
                        onChange={(e)=>setConfirmPwd(e.target.value)} 
                        className="pl-2 text-sm outline-none border-none w-full" 
                        type="password" 
                        name="confirm-password" 
                        value={confrimPwd} 
                        placeholder="Confirm Password" 
                    />              
                </div>
            </div>

            <button 
                type="submit" 
                value="signup" 
                id="signup" 
                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-black to-blue-900 hover:to-blue-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
            >
                Sign up
            </button>

            <div className="flex justify-center items-center mt-4">
                <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                    <span className="ml-2">Already have an account?
                        <Link to={'/'} className="text-xs ml-2 text-blue-500 font-semibold">Sign-in now</Link>
                    </span>
                </p>
            </div>
        </div>
    </form>
</div>

  );
}

export default SignUp;
'use client'

import { AiOutlineLogin } from "react-icons/ai"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useCart } from "@/component/cartFunction";


type LoginParameters = {
    email:string
    password:string
}

export default function Login(){
   const router = useRouter();
    const {setToken} = useCart();
    const [hide,setHide] = useState<boolean>(false)
    const [loginValue, setLoginValue] = useState<LoginParameters>({email:'',password:''})

      useEffect(() => {
        const tokenValue = localStorage.getItem('token');
        
            if(tokenValue){
                router.push(`${process.env.NEXT_PUBLIC_API_URL}/`)
                setToken(true);
            }
        }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValue((prev) => ({...prev,[name]: value,}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       // console.log(loginValue.email,'\n',loginValue.password)
        if (!loginValue.email || !loginValue.password) {
        toast.error('Please fill in all fields.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
        return;
        }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email:loginValue.email,
          password:loginValue.password,
      })
    })
    
      if (!response.ok) {
        if(response.statusText == 'Not Found'){
        toast.error(`User Not Registered`, { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
        return;
        }else{
        toast.error(`Invalid credentials`, { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
        return;  
        }
       }else{
        const data = await response.json();

        const tokenValue = data.token;

        localStorage.setItem('token',tokenValue);
        setToken(tokenValue);
        toast.success('User Logged In Successfully.', {position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false,pauseOnHover: true,draggable: true,progress: undefined,theme: "light", transition: Bounce,});
       router.push(`${process.env.NEXT_PUBLIC_API_URL}/`)
      } 
    }
    return(
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-400 m-4 rounded-xl overflow-hidden h-full">
            <div className="flex justify-center items-center">
                <div className="lg:w-3/4 flex flex-col border border-gray-400 rounded-xl m-6 p-4 shadow-xl/30">
                 <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
                    <span className="flex mb-4 justify-center gap-x-2">
                    <h1 className="text-gray-900 text-3xl title-font font-medium text-center">Login</h1>
                    <span className="w-8 my-auto"><Image src="/icon.png" width={200} height={200} alt="icon img" /></span>
                    </span>
                    <p className="text-sm title-font text-gray-500 tracking-widest mb-6 text-center">Log in to track your orders, manage your account, and enjoy a faster checkout experience.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="email">Email</label>
                        <span className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><input type="email" id="email" name="email" autoComplete="email" value={loginValue.email} onChange={handleChange} className="w-full px-3 py-2" placeholder="Your Email ..." /><AiOutlineLogin className="text-3xl px-1"/></span>
                        </div>
                        <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                                <span className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><input type={hide ? 'text' : 'password'} id="password" name="password" value={loginValue.password} onChange={handleChange} className="w-full  px-3 py-2" placeholder="Your Password ..."/>{hide ? <FaEye className="text-3xl px-1 cursor-pointer" onClick={()=> setHide(value => !value)}/> : <FaEyeSlash className="text-3xl px-1 cursor-pointer" onClick={()=> setHide(value => !value)}/>}</span>
                        </div>
                        <div className="mt-2 text-right"><Link href={'/forgot'} className="text-blue-500 hover:text-blue-800 cursor-pointer">Forgot your password?</Link></div>
                        <button type="submit" className="bg-blue-500 my-4 py-2 text-white rounded-2xl hover:bg-blue-800 w-full">Login</button>
                    </form>
                <div className="flex gap-x-3 mx-auto">
                    <p className="font-medium">Don't have an account</p>
                    <p className="text-blue-500 hover:text-blue-800 cursor-pointer font-bold"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/signup`}>SignUp </Link></p>
                </div>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center mx-4">
                <img src="https://readymadeui.com/login-image.webp" alt="Login Img" />
            </div>

        </section>
    )
}
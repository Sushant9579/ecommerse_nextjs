'use client';

import { useState,useEffect } from "react";
import { useCart } from "@/component/cartFunction";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const {setToken} = useCart();

    useEffect(() => {
          const tokenValue = localStorage.getItem('token');
          
              if(tokenValue){
                  router.push(`${process.env.NEXT_PUBLIC_API_URL}/`)
                  setToken(true);
              }
          }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to send reset link", { transition: Bounce });
        return;
      }

      toast.success("Password reset link generated!", { transition: Bounce });

    } catch (error) {
      toast.error("Something went wrong!", { transition: Bounce });
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-400 m-4 rounded-xl overflow-hidden h-full">
      <div className="flex justify-center items-center">
        <div className="lg:w-3/4 flex flex-col border border-gray-400 rounded-xl m-6 p-4 shadow-xl/30">
          <ToastContainer position="top-center" transition={Bounce} />
          <h1 className="text-gray-900 text-3xl font-medium text-center mb-4">Forgot Password</h1>
          <p className="text-sm text-gray-500 text-center mb-6"> Enter your registered email to receive a password reset link.</p>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email ..." required />
            <button type="submit" className="bg-blue-500 my-4 py-2 text-white rounded-2xl hover:bg-blue-800 w-full"> Continue</button>
          </form>

          <div className="flex gap-x-3 mx-auto">
            <p className="font-medium">Go to Login Page</p>
            <p className="text-blue-500 hover:text-blue-800 cursor-pointer font-bold"><Link href="/login">Login</Link></p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex justify-center items-center mx-4">
        <Image src="https://readymadeui.com/login-image.webp" alt="Forgot Password" width={500} height={500} />
      </div>
    </section>
  );
}

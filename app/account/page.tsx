'use client'

import { useState,useEffect } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import jwt from "jsonwebtoken";

export default function Account(){
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData,setUserData] = useState({ name:'', email:'', address:'', phone:'', city:'', state:'', });
  const [passData,setPassData] = useState({ oldPassword:"", newPassword:""});

  // Load user data from JWT on mount
  useEffect(() => {
    const token = localStorage.getItem("token")?.split(" ")[1];
    if (!token) {
      setError("Please login first!");
      setLoading(false);
      return;
    }
    const jwtData = jwt.decode(token) as | { email: string; name: string; mobile: string; address: string; city: string; state: string } | null;
    if (!jwtData) {
      setError("You are not logged in...");
      setLoading(false);
      return;
    }
    const { email, name, address, mobile, city, state } = jwtData;
    setUserData({ name, email, address, phone: mobile, city, state });
    setLoading(false);
  }, []);

  // Update form fields
  const handleChangeDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  // Submit user details
  const handleSubmitDetails = async (e: React.FormEvent) =>{
    e.preventDefault();
    const { name, address, phone, city, state, email } = userData;

    // Simple validation before sending
    if (!name || !address || !phone || !city || !state) {
      toast.error("Please fill all required fields", { position: "top-center", autoClose: 5000, theme:"light", transition: Bounce });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateUser`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, mobile: phone, city, state, email }),
      });

      const respon = await res.json();

      if (!respon.success) {
        toast.error(respon.message || "Failed to update user", { position: "top-center", autoClose: 5000, theme:"light", transition: Bounce });
      } else {
        toast.success('User Updated Successfully!', { position: "top-center", autoClose: 5000, theme:"light", transition: Bounce });
      }
    } catch {
      toast.error('Something went wrong!', { position: "top-center", autoClose: 5000, theme:"light", transition: Bounce });
    }
  }

  // Password handlers
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassData(prev => ({ ...prev, [name]: value }));
  }

const handleSubmitPass = async () => {
  if (!passData.oldPassword || !passData.newPassword) {
    return toast.error("Fill both old and new password", { position: "top-center", autoClose: 5000, theme: "light", transition: Bounce });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/changePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...passData, email: userData.email }),
    });

    const data = await res.json();

    if (!data.success) {
      return toast.error(data.message, { position: "top-center", autoClose: 5000, theme: "light", transition: Bounce });
    }

    toast.success(data.message, { position: "top-center", autoClose: 5000, theme: "light", transition: Bounce });
    setPassData({ oldPassword: "", newPassword: "" }); // Clear fields

  } catch {
    toast.error("Something went wrong", { position: "top-center", autoClose: 5000, theme: "light", transition: Bounce });
  }
};


  return (
    <section className="flex flex-col mx-4 border border-gray-300 rounded-md mt-3">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
      {error ? <div className="mx-auto text-2xl">{error}</div> :
      <div>
        {/* User Details */}
        <form className="flex flex-col mx-4 border border-gray-300 rounded-md mt-3" onSubmit={handleSubmitDetails}>
          <h1 className="mt-2 text-xl font-bold text-center">My Accounts</h1>
          <div className="mt-1 mx-2">
            {/* Name & Email */}
            <div className="flex gap-x-4 justify-between">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleChangeDetails} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Not Editable)</label>
                <input type="email" id="email" name="email" value={userData.email} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            {/* Address */}
            <div className="mt-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea id="address" name="address" value={userData.address} rows={3} onChange={handleChangeDetails} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* Phone, City, State */}
            <div className="flex gap-x-4 mt-2">
              <div className="w-1/3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChangeDetails} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/3">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" id="city" name="city" value={userData.city} onChange={handleChangeDetails} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/3">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" id="state" name="state" value={userData.state} onChange={handleChangeDetails} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="flex my-4 mx-auto bg-red-400 px-3 py-2 rounded-xl font-medium text-sm md:text-base gap-x-2 disabled:bg-red-200 disabled:cursor-not-allowed">Update Details</button>
          </div>
        </form>

        {/* Password Update */}
        <div className="flex flex-col mx-4 border border-gray-300 rounded-md my-3">
          <div className="mt-1 mx-2">
            <p className="my-2 font-medium">2. Change Your Password</p>
            <div className="flex gap-x-4 mt-4">
              <div className="w-1/2">
                <label htmlFor="old" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                <input type="text" id="old" name="oldPassword" value={passData.oldPassword} onChange={handleChangePass} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/2">
                <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="text" id="new" name="newPassword" value={passData.newPassword} onChange={handleChangePass} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button onClick={handleSubmitPass} disabled={loading} className="flex my-4 mx-auto bg-red-400 px-3 py-2 rounded-xl font-medium text-sm md:text-base gap-x-2 disabled:bg-red-200 disabled:cursor-not-allowed">Update Password</button>
          </div>
        </div>
      </div>}
    </section>
  )
}

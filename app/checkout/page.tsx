'use client';

import { useState,useEffect } from "react";
import { useCart } from "@/component/cartFunction";
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import Script from "next/script";
import Head from "next/head";
import jwt from 'jsonwebtoken';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import namer from 'color-namer';

export default function Checkout() {
  const [formData,setFormData] = useState({
     name:'',
      email:'',
      address:'',
      phone:'',
      pincode:'',
      city:'',
      state:'',
      fullAddress:""
  });

  const [error, setError] = useState("");
  const { cart, subTotal, removeFromCart, updateCart,clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token")?.split(" ")[1];

    if (!token) {
      setError("Please login first!");
      return;
    }

    const jwtData = jwt.decode(token) as | { email: string; name: string; mobile: string }| null;

    if (!jwtData) {
      setError("You are not logged in...");
      return;
    }

    const { email, name, mobile} = jwtData;

    setFormData({
      name,
      email,
      address: "",
      phone: mobile,
      pincode: "",
      city:"",
      state:"",
      fullAddress:""
    });
  }, []);

const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    // Update current field
    const updated = { ...prev, [name]: value };

    // Validate all fields
    const isValid =
      updated.name.length > 3 &&
      updated.address.length > 10 &&
      updated.phone.trim().length > 9 &&
      updated.pincode.trim().length > 5;

     updated.fullAddress = `${updated.address},${updated.city} ,${updated.state} Pincode: ${updated.pincode}`;


    // Update loading state based on validation
    setLoading(!isValid);

    return updated;
  });

    
  if (name === "pincode" && value.length ==6) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pincode`);
      const data = await res.json();

      if (data[e.target.value]) {
        setFormData((prev) => ({
          ...prev,
          city: data[e.target.value][0],
          state: data[e.target.value][1],
        }));
      }
    } catch (err) {
      console.error("Error fetching pincode data:", err);
    }
  }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  const oid = Math.floor(Math.random() * Date.now());
  const {email,name,phone,pincode,fullAddress } = formData;

  // Call backend to get txnToken
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/preTransaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subTotal, email, oid,fullAddress,pincode,cart,name,phone}),
  });

  const  respon  = await res.json();
 // console.log(respon);
  if (respon.success == false){
    clearCart();
    return toast.error(respon.message, { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce, });;
  }else if(!respon || !respon.txnToken){
    return toast.error('Payment Token is not Generated', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce, });;
  }
  const txnToken = respon.TXN_TOKEN;
  // Paytm config
  const config = {
    root: "",
    flow: "DEFAULT",
    data: {
      orderId: oid,
      token: txnToken,
      tokenType: "TXN_TOKEN",
      amount: subTotal,
      userDetail: { mobileNumber: phone, name, email },
    },
    merchant: { mid: process.env.PAYTM_MID, name: "E-Commerce Payment", redirect: true },
    handler: { notifyMerchant: (event: unknown, data: unknown) => console.log(event, data) },
  };

  if (window.Paytm?.CheckoutJS) {
    window.Paytm.CheckoutJS.onLoad(() => {
      window.Paytm.CheckoutJS.init(config).then(() => window.Paytm.CheckoutJS.invoke());
    });
  }
};


  return (
    <section className="flex flex-col mx-4 border border-gray-300 rounded-md mt-3">
     <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script 
              type="application/javascript" 
              src = {`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} />
    
     {error ? <div className="mx-auto text-2xl">{error}</div>
            :<div>
              <h1 className="mt-2 text-xl font-bold text-center">Checkout</h1>
              <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
            {/* Delivery Details */}
            <div className="mt-1 mx-2">
            <p className="my-2 font-medium">1. Delivery Details</p>

            {/* Name and Email */}
            <div className="flex gap-x-4 justify-between">
                <div className="w-1/2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} autoComplete="name" id="name" name="name" placeholder="Your name ..." onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                </div>
                <div className="w-1/2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} autoComplete="email" id="email" name="email" placeholder="Your Email ..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required readOnly/>
                </div>
            </div>

            {/* Address */}
            <div className="mt-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea id="address" value={formData.address} autoComplete="address" name="address" rows={3} placeholder="Your Address ..." onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>

            {/* Phone and City */}
            <div className="flex gap-x-4 mt-2 justify-between">
                <div className="w-1/2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" id="phone" value={formData.phone} autoComplete="phone" name="phone" placeholder="Your Phone No. ..." onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                </div>
                <div className="w-1/2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input type="text" id="pincode" value={formData.pincode} name="pincode" placeholder="Your Pincode ..." onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                </div>
            </div>

            {/* State and Pincode */}
            <div className="flex gap-x-4 mt-2 justify-between">
                <div className="w-1/2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" onChange={handleChange} id="city" value={formData.city} name="city" placeholder="Your City ..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="w-1/2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" onChange={handleChange} id="state" value={formData.state} name="state" placeholder="Your State ..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                </div>
            </div>
            </div>


      {/* Cart Items */}
      <div className="mt-2 mx-2">
        <p className="my-2 font-medium">2. Review Cart Items</p>
        <div className="bg-amber-200 p-5 rounded-md">
          <h2 className="font-bold text-center pb-2 lg:text-lg">Shopping Cart</h2>
          <ol className="list-decimal font-medium mb-6 max-w-3/5 mx-auto">
            {Object.keys(cart).length === 0 && <div className="text-center font-bold">Your Cart is Empty!</div>}
            {Object.keys(cart).map((items, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm md:text-base">{`${cart[items].name}(${cart[items].size}/${namer(cart[items].color).basic[0].name})`}</div>
                  <div className="flex items-center gap-2 md:pl-8">
                    <MdOutlineRemoveShoppingCart className="cursor-pointer" onClick={() => removeFromCart(items, 1)} />
                    <span className="font-bold">{cart[items].qty}</span>
                    <MdOutlineAddShoppingCart className="cursor-pointer" onClick={() => updateCart(items, 1)} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="font-medium flex items-center underline">
            Subtotal: <FaIndianRupeeSign className="text-sm ml-2"/> {subTotal}
          </p>
        </div>

        {/* Pay Button */}
        <button className="flex my-2 items-center cursor-pointer bg-red-400 px-3 py-2 rounded-xl font-medium text-sm md:text-base gap-x-2 disabled:bg-red-200 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={loading}><GiCash /> {loading ? "Enter Complete Data for Proceeding ...." : `Pay ${subTotal}`} </button>
      </div>
              </div>}
    </section>
  );
}

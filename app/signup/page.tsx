'use client';

import { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useCart } from "@/component/cartFunction";

type SignUpForm = {
  username: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof SignUpForm, string>>;

export default function SignUp() {
  const router = useRouter();
  const {setToken} = useCart();
    useEffect(() => {
          const tokenValue = localStorage.getItem('token');
          
              if(tokenValue){
                  router.push(`${process.env.NEXT_PUBLIC_API_URL}/`)
                  setToken(true);
              }
          }, [router, setToken]);

  const [form, setForm] = useState<SignUpForm>({
    username: '',
    email: '',
    mobile: '',
    address:'',
    city:'',
    state: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({...prev,
                            [name]: value,
                        }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { username, email, mobile,address,city,state, password, confirmPassword } = form;

    if (!username.trim()){
      newErrors.username = 'Username is required.';
      toast.error('Username is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,}); 
    } 
    if (!email.trim()){
        newErrors.email = 'Email is required.';
        toast.error('Email is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 
    if (!address.trim()){
        newErrors.email = 'Address is required.';
        toast.error('Address is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 
    if (!city.trim()){
        newErrors.email = 'City is required.';
        toast.error('City is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 
    if (!state.trim()){
        newErrors.email = 'State is required.';
        toast.error('State is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 
    if (!mobile.trim()){
      newErrors.mobile = 'Mobile number is required.';
      toast.error('Mobile number is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 
    else if (!/^\d{10}$/.test(mobile)){
        newErrors.mobile = 'Mobile must be exactly 10 digits.';
        toast.error('Mobile must be exactly 10 digits.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } 

    if (!password) {
      newErrors.password = 'Password is required.';
      toast.error('Password is required.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
    ) {
      newErrors.password ='Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
      toast.error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      toast.error('Please confirm your password.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      toast.error('Passwords do not match.', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
    }

    return newErrors;
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit logic
    // Object.entries(form).forEach(([key, value]) => {
    //     console.log(`${key}: ${value}`);
    //     });
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(form.confirmPassword, salt);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adduser`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          name:form.username,
          email:form.email,
          address:form.address,
          city:form.city,
          state:form.state,
          password:pass,
          mobile:form.mobile
      })
    })
      //const data = response.json();
       if (!response.ok) {
        toast.error('Something Went Wrong...\n User not Created', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,});
        return;
       }else{
        toast.success('User Created Successfully.', {position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false,pauseOnHover: true,draggable: true,progress: undefined,theme: "light", transition: Bounce,});
        router.push(`${process.env.NEXT_PUBLIC_API_URL}/login`)
      } 
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-400 m-4 rounded-xl overflow-hidden h-full">
      <div className="hidden lg:flex justify-center items-center mx-4">
        <Image src="https://readymadeui.com/login-image.webp" alt="Sign Up" width={400} height={400} />
      </div>
      <div className="flex justify-center items-center">
        <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
        <div className="lg:w-3/4 flex flex-col border border-gray-400 rounded-xl m-6 p-4 shadow-xl/30">
          <h1 className="text-gray-900 text-3xl font-medium text-center mb-4">Sign Up</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Create your account to shop the latest products, track orders, and enjoy exclusive deals.
          </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Username', name: 'username', type: 'text', placeholder: 'Your Name ...' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'Your Email ...' },
                { label: 'Mobile Number', name: 'mobile', type: 'tel', placeholder: 'Your Mobile Number ...' },
                { label: 'Address', name: 'address', type: 'textarea', placeholder: 'Your Address ...' },
                { label: 'City', name: 'city', type: 'text', placeholder: 'Your City Name ...' },
                { label: 'State', name: 'state', type: 'text', placeholder: 'Your State Name ...' },
                { label: 'Password', name: 'password', type: 'password', placeholder: 'Your Password ...' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Re-enter Your Password ...' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}><label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1"> {label}</label>

                  {type === 'textarea' ? (
                    <textarea id={name} name={name} value={form[name as keyof SignUpForm]} onChange={handleChange} placeholder={placeholder} className={`w-full px-3 py-2 border ${   errors[name as keyof SignUpForm] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} rows={3}/>
                  ) : (
                    <input  type={type}  id={name}  name={name}  value={form[name as keyof SignUpForm]}  onChange={handleChange}  autoComplete={name !== 'password' && name !== 'confirmPassword' ? name : undefined}  placeholder={placeholder}  className={`w-full px-3 py-2 border ${    errors[name as keyof SignUpForm] ? 'border-red-500' : 'border-gray-300'  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}/>
                  )}

                  {errors[name as keyof SignUpForm] && ( <p className="text-sm text-red-600 mt-1">{errors[name as keyof SignUpForm]}</p> )}
                </div>
              ))}

              <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white py-2 rounded-2xl w-full"> Sign Up</button>
            </form>


          <div className="flex justify-center mt-4 gap-x-2">
            <p>Already have an account?</p>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login`} className="text-blue-500 hover:text-blue-800 font-bold">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

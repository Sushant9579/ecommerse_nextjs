'use client'

import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import Dropdown from "@/component/dropdown";
import { useRef, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineAddShoppingCart,MdOutlineRemoveShoppingCart, MdAccountBox   } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { useCart } from "@/component/cartFunction";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { usePathname } from "next/navigation";
// @ts-ignore
import namer from 'color-namer';

export default function Head(){
    const pathname = usePathname();

    const {cart, subTotal, addToCart,updateCart, removeFromCart, clearCart,OpenClose,setOpenClose,ArrowOpen,setArrowOpen,token,setToken} = useCart();
    
    const myDivRef  = useRef<HTMLDivElement>(null);
    // const [OpenClose,setOpenClose] = useState<Boolean>(false);

      useEffect(() => {
        const tokenValue = localStorage.getItem('token');
        
            if(tokenValue){
                setToken(true);
            }
        }, []);

    useEffect(() => {
                    if (OpenClose) {
                                    const popupdiv = myDivRef.current;
                                    if (!popupdiv) return;
                                    popupdiv.classList.add('reveal-down');
                                    const timeoutId = window.setTimeout(() => {
                                        popupdiv.classList.remove('reveal-down');
                                    }, 1000);
                                    return () => window.clearTimeout(timeoutId);
                                }
                    }, [OpenClose]);
    return(
        <header className="flex justify-between items-center shadow-xl/30 sticky top-0 bg-white z-50">
            <div className="flex justify-between">
                <div className="w-60 md:w-70">
                    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/`}><Image src="/logo.png" alt="404 Image Not Found" width={1000} height={1000} priority/></Link>
                </div>
                <div className="my-auto md:hidden">
                    <Dropdown />
                </div>
                <div className="hidden md:block my-auto">
                    <nav>
                        <ul className="flex justify-center items-center gap-x-2">
                            <li className="text-lg text-shadow-lg font-medium cursor-pointer hover:text-gray-500 hover:text-xl hover:text-center"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/tshirt`}>T-Shirts</Link></li>
                            <li className="text-lg text-shadow-lg font-medium cursor-pointer hover:text-gray-500 hover:text-xl hover:text-center"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/hoodies`}>Hoodies</Link></li>
                            <li className="text-lg text-shadow-lg font-medium cursor-pointer hover:text-gray-500 hover:text-xl hover:text-center"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/mugs`}>Mugs</Link></li>
                            <li className="text-lg text-shadow-lg font-medium cursor-pointer hover:text-gray-500 hover:text-xl hover:text-center"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/wallpapers`}>Wallpapers</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="mr-3 flex gap-x-3 items-center">
                {token && <MdAccountBox className="text-xl md:text-2xl" onClick={()=>{setArrowOpen((prev:boolean) => !prev);setOpenClose((prev:boolean) => prev=false)}}/>}
                {(!token && pathname !== '/login') && <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login`}><span className="bg-blue-500 px-3 py-2 rounded-2xl hover:bg-blue-700 text-white">Login</span></Link>}
                {token && <FaCartArrowDown className="text-xl md:text-2xl" onClick={()=>{setOpenClose((prev:boolean) => !prev);setArrowOpen((prev:boolean) => prev=false)}}/>}
                    {OpenClose && <div ref={myDivRef} className="absolute top-0 right-0 mt-14 mr-1 z-50">
                    {/* Arrow (▲) */}
                    <div className="absolute -top-2 right-3 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-amber-500"></div>
                    {/* Main box */}
                    <div className="bg-amber-500 pl-5 pr-2 py-5 rounded-2xl shadow-2xl">
                       <RiCloseCircleFill className="absolute top-1 right-1 m-1" onClick={()=>setOpenClose((prev:boolean) => !prev)}/>
                        <h2 className="font-bold flex justify-center items-center pb-2 lg:text-lg">Shopping Cart</h2>

                    <ol className="list-decimal pl-6 mb-6 max-h-90 overflow-y-scroll" style={{scrollbarWidth: "thin",scrollbarColor: "#9ca3af #f59e0b",}}>
                            {Object.keys(cart).length == 0 && <div className="text-center font-bold">Your Cart is Empty.!!!</div> }
                            {Object.keys(cart).map((items,index) => {
                                return (
                                <li className="mb-2 mr-2" key={index}>
                                    <div className="flex items-center justify-between pl-2">
                                        <div className="text-sm md:text-base">{`${cart[items].name}(${cart[items].size}/${namer(cart[items].color).basic[0].name})`}</div>
                                        <div className="flex items-center gap-2 pl-2 md:pl-8">
                                            <MdOutlineRemoveShoppingCart className="cursor-pointer" onClick={() => {removeFromCart(`${items}`,1)}}/>
                                            <span className="font-bold">{cart[items].qty}</span>
                                            <MdOutlineAddShoppingCart className="cursor-pointer" onClick={() => {updateCart(`${items}`,1)}} />
                                        </div>
                                    </div>
                                </li>
                                )
                            })}
                        
                    </ol>
                    
                        <div className="mb-4">
                            <p className="font-medium flex items-center gap-x-2 underline">Subtotal: <span className="flex items-center"><FaIndianRupeeSign className="text-sm"/>{subTotal}</span></p>
                        </div>
                    
                       <div className="flex justify-around gap-2">
                        <Link href={Object.keys(cart).length === 0 ? "#" : `${process.env.NEXT_PUBLIC_API_URL}/checkout`} className={`flex gap-1 items-center px-3 py-2 rounded-2xl font-bold text-xs md:text-base ${ Object.keys(cart).length === 0 ? "bg-red-200 cursor-not-allowed" : "bg-red-400" }`}><IoBagCheckOutline /> Checkout</Link>
                        <button disabled={Object.keys(cart).length == 0} className="cursor-pointer disabled:bg-red-200 disabled:cursor-not-allowed bg-red-400 px-3 py-2 rounded-2xl font-bold text-xs md:text-base" onClick={clearCart}> Clear Cart</button>
                       </div>
                    </div>
                    </div>}
                    {ArrowOpen && <div ref={myDivRef} className="absolute top-1 right-9 mt-14 mr-1 z-50">
                    {/* Arrow (▲) */}
                    <div className="absolute -top-2 right-3 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-amber-500"></div>
                    {/* Main box */}
                    <div className="bg-amber-500 px-4 py-5 rounded-2xl shadow-2xl">
                       <RiCloseCircleFill className="absolute top-1 right-1 m-1" onClick={()=>setArrowOpen((prev:boolean) => !prev)}/>
                       
                    <ol className="mt-2">
                        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/account`}><li className="font-semibold hover:text-gray-500">My Account</li></Link>
                        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/myorder`}><li className="font-semibold hover:text-gray-500">My Order</li></Link>
                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/login`}><li className="font-semibold hover:text-gray-500" onClick={()=>{localStorage.removeItem('token'); setArrowOpen(false); setOpenClose(false)}}>Log Out</li></a>
                    </ol>
                        
                       
                    </div>
                    </div>}
            </div>
            
        </header>
    )
}
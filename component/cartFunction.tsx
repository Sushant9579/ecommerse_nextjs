'use client'

import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

// Define your Cart types
type CartItem = {
  qty: number;
  price: number;
  name: string;
  size: string;
  color: string;
  id: string;
};

type Cart = {
  [key: string]: CartItem;
};

type CartContextType = {
  cart: Cart;
  subTotal: number;
  OpenClose:boolean;
  ArrowOpen:boolean;
  token:boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
  setArrowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (item: string, qty: number, price: number, name: string, size: string, color: string,id: string) => void;
  updateCart: (item:string,qty:number) => void;
  removeFromCart: (item: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [OpenClose,setOpenClose] = useState<boolean>(false);
  const [ArrowOpen,setArrowOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>({});
  const [token,setToken] = useState<boolean>(false)
  const [subTotal, setSubTotal] = useState<number>(0);

  const pathname = usePathname();
  const ref = useRef<any>(null);

    useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart(); // start when route changes
      setTimeout(() => {
        ref.current.complete(); // finish after short delay
      }, 400);
    }
  }, [pathname]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        calculateSubtotal(parsedCart);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

 const calculateSubtotal = (myCart: Cart) => {
  let subt = 0;
  const items = Object.values(myCart);
  
  for (let i = 0; i < items.length; i++) {
    subt = subt + items[i].price * items[i].qty;
  }

  setSubTotal(subt);
};

  const saveCart = (myCart: Cart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    calculateSubtotal(myCart);
  };

  const updateCart = (item:string,qty: number) => {
    const newCart = {...cart};
    if(item in newCart){
      newCart[item].qty = newCart[item].qty + qty;
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const addToCart = (item: string, qty: number, price: number, name: string, size: string, color: string, id:string ) => {
    const newCart = {...cart};
    const key = `${item}-${size}-${color}`;
    if (key in newCart) {
      newCart[key].qty = newCart[key].qty + qty;
    }else {
       newCart[key] = { qty, price, name, size, color,id }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (item: string, qty: number) => {
    const newCart = {...cart};
    if (item in newCart) {
      newCart[item].qty = newCart[item].qty - qty;
    }
    if (newCart[item].qty <= 0) {
        delete newCart[item];
      }
      setCart(newCart);
      saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <CartContext.Provider value={{ cart, subTotal, addToCart,updateCart, removeFromCart, clearCart,OpenClose,setOpenClose,ArrowOpen,setArrowOpen,token,setToken }}>
      <LoadingBar color="#3b82f6" height={4} ref={ref} shadow={true} className="z-[9999]"/>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('You are Not Using Defined Function of Cart!!!');
  }
  return context;
};
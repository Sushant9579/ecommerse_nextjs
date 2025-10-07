'use client';

import { useCart } from '@/component/cartFunction';
import { useState } from 'react';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from 'react-toastify';

type Product = {
  id: string;
  title: string;
  product: string;
  desc: string;
  img: string;
  price: number;
  size: string;
  color: string;
  availableQty: number;
};

type ListProduct = Record<string, Record<string, Product>>;

export default function ProductClient({ ListProduct }: { ListProduct: ListProduct }) {
  const { addToCart, setOpenClose } = useCart();
  const router = useRouter();

  const [pin, setPin] = useState<number | null>(null);
  const [pinCheck, setPinCheck] = useState<boolean | null>(null);

const checkPincode = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pincode`);
  const data = await res.json();

  const isServiceable = pin !== null && Object.keys(data).includes(String(pin));
    setPinCheck(isServiceable); // update state for UI

      if (isServiceable) {
        toast.success('Pincode is Serviceable', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,
        });
      } else {
        toast.error('Sorry!!, Pincode is not Serviceable', { position: "top-left", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce,
        });
      }
};

  const allSizes = Object.keys(ListProduct); //[S,M,L,XL,...]

  // Default selected size and color
  const [selectedSize, setSelectedSize] = useState<string>(allSizes[0]); //First size selected Default
  const [selectedColor, setSelectedColor] = useState<string>(Object.keys(ListProduct[allSizes[0]])[0]); //First size selected Default in which first size of first color is selected

  const currentProduct = ListProduct[selectedSize][selectedColor];
  //console.log(currentProduct)
   const buyNow = async () => {
   await addToCart( currentProduct.id, 1, currentProduct.price, currentProduct.title, currentProduct.size, currentProduct.color,currentProduct.id); 
    //setOpenClose(true);
   await router.push(`${process.env.NEXT_PUBLIC_API_URL}/checkout`)
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
         <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-5/6 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-3/8 w-full lg:h-full h-auto md:w-3/5 mx-auto object-cover object-top rounded" src={currentProduct.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col place-self-center">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{currentProduct.product}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentProduct.title}</h1>

            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>

            <p className="leading-relaxed">{currentProduct.desc}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex gap-x-2 overflow-x-auto">
                <span className="mr-3">Color</span>
                {Object.keys(ListProduct[selectedSize]).map((color) => (
                  <button key={color} className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} />
                ))}
              </div>

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <select className="w-20 max-md:appearance-none max-md:w-15 text-base focus:outline-blue-400 bg-white border border-gray-300 rounded px-2 py-2" value={selectedSize} onChange={(e) => { const newSize = e.target.value; setSelectedSize(newSize); const firstColor = Object.keys(ListProduct[newSize])[0]; setSelectedColor(firstColor); }} >
                  {['S', 'M', 'L', 'XL', '2XL', '3XL','350ml',"1920x1080px", "2560x1440px","3840x2160px"].map((size) => ListProduct[size] && <option key={size} value={size}>{size}</option> )}
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              {currentProduct.availableQty !== 0 && <span className="title-font font-medium text-2xl text-gray-900 flex items-center"> <FaIndianRupeeSign className="text-xl" />{currentProduct.price} </span>}
              {currentProduct.availableQty == 0 && <span className="px-4 py-2 font-semibold text-red-800 bg-red-100 rounded-full text-center">Item is Out of Stock.</span>}
              <div className="flex items-center gap-x-2">
                <button disabled={currentProduct.availableQty == 0 ? true: false} className="flex text-white disabled:bg-blue-200 disabled:cursor-not-allowed bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded-2xl" onClick={buyNow}>Buy Now</button>
                <button disabled={currentProduct.availableQty == 0 ? true: false} className="flex text-white disabled:bg-blue-200 disabled:cursor-not-allowed bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded-2xl" onClick={() => { addToCart( currentProduct.id, 1, currentProduct.price, currentProduct.title, currentProduct.size, currentProduct.color,currentProduct.id); setOpenClose(true); }}> Add to Cart </button>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex justify-center gap-4">
                <input type="text" placeholder="Enter Your Pincode..." name="pincode" className="border rounded-2xl px-3 py-2" onChange={(e) => setPin(Number(e.target.value))} />
                <button disabled={currentProduct.availableQty == 0 ? true: false} className="text-white bg-blue-500 border-0 py-2 px-3 focus:outline-none  disabled:bg-blue-200 disabled:cursor-not-allowed hover:bg-blue-500 rounded-2xl text-sm" onClick={checkPincode} > Check Pincode </button>
              </div>
              <div className="mt-3 w-3/4 mx-auto">
                {pinCheck && <p className="text-green-600 text-center">The Pincode is Serviceable</p>}
                {pinCheck === false && <p className="text-red-600 text-center">Sorry!! We do not Deliver to this Pincode Yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

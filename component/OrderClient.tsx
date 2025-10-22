'use client'
import { useEffect, useState } from "react";
import { useCart } from "./cartFunction"; // adjust path
import namer from "color-namer";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  color: string;
  product: {
    title: string;
    size: string;
  };
};

interface OrderData {
  orderID: string;
  status: "Paid" | "Pending" | string;
  amount: number;
  products: OrderItem[];
}

interface OrderClientProps {
  order: OrderData;
  clearCartParam?: string | boolean;
}

export default function OrderClient({ order, clearCartParam }: OrderClientProps) {
  const { clearCart } = useCart();
  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    if (clearCartParam && !hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [clearCartParam]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 lg:py-10 mx-auto">
        {/* Top Image */}
        <div className="w-3/4 h-80 max-md:h-64 max-md:w-full mb-6 mx-auto hidden max-xl:block">
          <img alt="ecommerce" className="object-contain object-center rounded w-full h-full" src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-order-placed-successfully-illustration-svg-download-png-13015083.png" />
        </div>

        <div className="xl:w-4/5 mx-auto flex flex-wrap border border-gray-400 rounded-md">
          {/* Order Summary */}
          <div className="xl:w-1/2 w-full xl:pr-10 xl:py-6 mb-6 xl:mb-0 mx-4 mt-3">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">E-Commerce Site</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4"> Order ID: #{order.orderID}</h1>
            <p className="leading-relaxed mb-4">{order.status === "Paid" ? (
                <span className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full"> Your Order has been Successfully Placed.</span>
              ) : order.status === "Pending" ? (<span className="px-2 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full"> Your Order is Pending... </span>
              ) : ( <span className="px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full"> You Cancelled this Order.</span>
              )}</p>

            {/* Table Header */}
            <div className="flex mb-4 font-semibold text-center">
              <span className="flex-grow py-2 text-lg px-1">Item Description</span>
              <span className="flex-grow py-2 text-lg px-1">Quantity</span>
              <span className="flex-grow py-2 text-lg px-1">Items Total</span>
            </div>

            {/* Order Items */}
            {order.products.map((p: OrderItem) => (
              <div key={p.id} className="flex border-y border-gray-200 py-2 justify-between items-center">
                <div className="flex w-1/3 gap-2 items-center"> <span className="text-gray-500 text-center">{`${p.product.title}-${p.product.size}/${namer(p.color).basic[0].name}`}</span> </div>
                <span className="text-gray-500 w-1/3 text-center">{p.quantity}</span>
                <span className="text-gray-500 w-1/3 text-right">{p.quantity} × ₹{p.price} = ₹{p.price * p.quantity}</span>
              </div>
            ))}

            {/* Total & Button */}
            <div className="flex flex-col mt-6 gap-y-3"> <span className="title-font font-medium text-2xl text-gray-900"> SubTotal: ₹{order.amount} </span>
              <button className="text-white bg-blue-500 py-2 px-6 hover:bg-blue-600 rounded w-2/5 text-center"> Track Order </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="xl:h-3/4 mx-auto my-auto hidden xl:block">
            <img alt="ecommerce" className="w-full h-full object-cover object-center rounded" src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-order-placed-successfully-illustration-svg-download-png-13015083.png" />
          </div>
        </div>
      </div>
    </section>
  );
}

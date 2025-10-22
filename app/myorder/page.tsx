'use client'

import { useState, useEffect } from "react";
import namer from "color-namer";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  size: string;
  color: string;
  price: number;
}

interface ProductOrder {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  orderID: string;
  status: string;
  amount: number;
  products: ProductOrder[];
}

export default function MyOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token")?.split(" ")[1];
      if (!token) {
        setError("Please login first!");
        return;
      }

      try {
        const res = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const text = await res.text(); // raw response
        let data;
        try {
          data = JSON.parse(text); // parse JSON safely
        } catch {
          console.error("Invalid JSON response:", text);
          setError("Server returned invalid response");
          return;
        }

        if (res.ok) setOrders(data);
        else setError(data.error || "Failed to fetch orders");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch orders";
        setError(message);
      }
    };

    fetchOrders();
  }, []);

  if (error) return <div className="text-red-600 text-center mt-5">{error}</div>;

  return (
    <section className="overflow-x-auto mx-5 mt-6">
      <h1 className="flex justify-center text-2xl font-bold text-shadow-gray-700 my-3">My Orders</h1>
      {orders.length === 0 && <p className="text-center">No orders found.</p>}

      {orders.map((order) => (
        <Link key={order.orderID} href={`${process.env.NEXT_PUBLIC_API_URL}/order/${order.orderID}`}>
          <div className="mb-6 border rounded-md p-4">
          <h2 className="font-medium">Order ID: #{order.orderID}</h2>
          <p> Status:{" "}
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              order.status === "Paid"
                ? "bg-green-100 text-green-800"
                : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {order.status}
            </span>
          </p>

          <table className="min-w-full border border-gray-200 text-sm mt-2">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium border-b">#</th>
                <th className="px-4 py-2 text-left font-medium border-b">Product</th>
                <th className="px-4 py-2 text-left font-medium border-b">Price</th>
                <th className="px-4 py-2 text-left font-medium border-b">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.products.map((p, idx) => (
                <tr key={p.id}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{p.product.title}-{p.product.size}/{namer(p.product.color).basic[0].name}</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-2 font-medium">Subtotal: ₹{order.amount}</p>
        </div>
         </Link>
      ))
       }
    </section>
  );
}

'use client';

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { transition: Bounce });
      return;
    }

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to reset password", { transition: Bounce });
        return;
      }

      toast.success("Password reset successful!", { transition: Bounce });
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      toast.error("Something went wrong!", { transition: Bounce });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.", { transition: Bounce });
      router.push("/forgot");
    }
  }, [token, router]);

  return (
    <section className="flex justify-center items-center h-screen">
      <ToastContainer position="top-center" transition={Bounce} />
      <div className="w-full max-w-md border border-gray-400 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-900 mb-1">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Enter new password" required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-900 mb-1">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Confirm password" required />
          </div>

          <button type="submit" className="bg-blue-500 my-4 py-2 text-white rounded-2xl hover:bg-blue-800 w-full"> Reset Password </button>
        </form>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<section className="flex justify-center items-center h-screen"><div>Loading...</div></section>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

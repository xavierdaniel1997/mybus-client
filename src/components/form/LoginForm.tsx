"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "@/lib/validations/auth";
import { handleApiError } from "@/lib/utils/handleApiError";
import { api } from "@/lib/api";
import { useAuthStore } from "@/app/(store)/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginFromProps {
  closeDialog: () => void;
  tripId?: string;
}

export default function LoginForm({closeDialog, tripId} : LoginFromProps) {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  })
  
  const [loading, setLoading] = useState(false)
  const {setAuth} = useAuthStore();
  const router = useRouter()

  // Prefetch routes to improve navigation speed
  useEffect(() => {
    router.prefetch("/admin");
    router.prefetch("/");
  }, [router]);


  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    try{
      const response = await api.post("/auth/login-user", data)
      toast.success(response.data.message)
      reset()
      closeDialog()
       const { user, accessToken, expiresIn } = response.data;
       setAuth(user, accessToken, expiresIn);
      const targetRoute = response.data.user.role === "ADMIN" ? "/admin" : tripId ? `/trip/${tripId}` : "/";
      router.push(targetRoute);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }catch(error){
      handleApiError(error)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <label className="block text-sm text-gray-700 mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
    </>
  );
}

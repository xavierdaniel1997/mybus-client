"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema, SignupData} from "@/lib/validations/auth";
import {useEffect} from "react";
import {handleApiError} from "@/lib/utils/handleApiError";
import {api} from "@/lib/api";
import {toast} from "sonner";

type Mode = "verifyEmail" | "login" | "signup" | "otp";

interface SignupFormProps {
  setMode: (mode: Mode) => void;
  closeDialog: () => void;
}

export default function SignupForm({setMode, closeDialog}:  SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setValue,
    reset,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  const onSubmit = async (data: SignupData) => {
    try {
      const response = await api.put("/auth/register-verified-user", data);
      if (response.status === 200) {
        console.log("resposne for the verified register user", response)
        toast.success(response.data.message)
        closeDialog()
        setMode("login")
        sessionStorage.removeItem("userEmail")
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center  items-center space-y-4"
    >
      <div className="flex items-center gap-4 mb-2 w-full">
        <div className="w-full">
          <div className="flex items-center mb-1">
            <label className="block text-sm text-gray-700">
              First Name <span className="text-red-600">*</span>
            </label> 
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <input
            {...register("firstName")}
            type="text"
            placeholder="John"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center mb-1">
          <label className="block text-sm text-gray-700">last Name <span className="text-red-600">*</span></label>
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Doe"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center mb-1">
        <label className="block text-sm text-gray-700">Phone No <span className="text-red-600">*</span></label>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <input
          {...register("phone")}
          type="number"
          placeholder="8745875664"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

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
        <div className="flex items-center mb-1">
        <label className="block text-sm text-gray-700">Password <span className="text-red-600">*</span></label>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
      </div>

      <div className="w-full">
        <div className="flex items-center mb-1">
        <label className="block text-sm text-gray-700">
          Confirm Password <span className="text-red-600">*</span>
        </label>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        className="block w-fit bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-800 transition"
      >
        Sign Up
      </button>
    </form>
  );
}

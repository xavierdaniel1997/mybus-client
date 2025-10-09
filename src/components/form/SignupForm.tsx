"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupSchema, SignupData} from "@/lib/validations/auth";
import { useEffect } from "react";

export default function SignupForm({mode}: {mode: string}) {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setValue,
    reset
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema)
  })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setValue("email", storedEmail); 
    }
  }, [setValue]);

  const onSubmit = async (data: SignupData) => {
    console.log("this is the data form signup form", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center  items-center space-y-4">
      <div className="flex items-center gap-4 mb-2 w-full">
        <div className="w-full">
          <label className="block text-sm text-gray-700">First Name</label>
          <input
          {...register("firstName")}
            type="text"
            placeholder="John"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm text-gray-700">last Name</label>
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
        <label className="block text-sm text-gray-700 mb-1">Phone No</label>
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
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input
        {...register("password")}
          type="password"
          placeholder="••••••••"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
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

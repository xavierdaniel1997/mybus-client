"use client";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function TripDetailsPage() {
  const { id } = useParams();

  const getTripDetail = async () => {
    if(!id) return
    try{
        const response = await api.get(`/mytrips/get-trip-detail/${id}`)
        console.log("testing the respons of the gettripdetails", response)
    }catch(error){
        handleApiError(error)
    }
  }
  useEffect(() => {
    getTripDetail()
  }, [id])

  return (
    <div className="mx-auto w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-6xl mt-6 space-y-6 pb-10">
      Trip details page for ID: {id}
    </div>
  );
}

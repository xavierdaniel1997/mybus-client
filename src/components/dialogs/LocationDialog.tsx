"use client";

import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {useForm} from "react-hook-form";
import {LocationData, locationSchema} from "@/lib/validations/location";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {handleApiError} from "@/lib/utils/handleApiError";
import {api} from "@/lib/api";

interface LocationDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess: () => void;
}

export default function LocationDialog({
  open,
  onOpenChange,
  onSuccess,
}: LocationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isControlled = open !== undefined;
  const isDialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = isControlled
    ? onOpenChange
    : (v: boolean) => setInternalOpen(v);

  const closeDialog = () => handleOpenChange?.(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {isSubmitting, errors},
  } = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = async (data: LocationData) => {
    // console.log("data form the location upload" , data);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("stationCode", data.stationCode);
      if (data.latitude) formData.append("latitude", data.latitude);
      if (data.longitude) formData.append("longitude", data.longitude);

      if (data.locationImage instanceof File) {
        formData.append("locationImage", data.locationImage);
        console.log("Appending locationImage:", data.locationImage.name);
      } else {
        console.log("No locationImage provided or invalid file");
      }

      for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
      const response = await api.post("location/create-location", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset()
      closeDialog()
      onSuccess()
      console.log("response from the onsubmit location", response);
    } catch (error) {
      handleApiError(error);
    }
  };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("locationImage", file);
//       setPreviewImage(URL.createObjectURL(file));
//     } else {
//       setValue("locationImage", undefined);
//       setPreviewImage(null);
//     }
//   };


const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] ?? null; // get the first file or null
  setValue("locationImage", file, { shouldValidate: true }); // update RHF
  setPreviewImage(file ? URL.createObjectURL(file) : null);
};

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-3xl !w-[95vw] !md:w-[60vw] p-10 overflow-hidden rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-600 text-2xl font-semibold">
            Add New Location
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Create a new location for new routes
          </DialogDescription>
        </DialogHeader>

        {/* ===== FORM START ===== */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* ===== LEFT SECTION ===== */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter location name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("city")}
                  type="text"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  State <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("state")}
                  type="text"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* Station Code */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Station Code <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("stationCode")}
                  type="text"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Enter station code"
                />
                {errors.stationCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stationCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* ===== RIGHT SECTION ===== */}
            <div className="flex-1 space-y-4">
              {/* Latitude */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Latitude
                </label>
                <input
                  {...register("latitude")}
                  type="text"
                  id="latitude"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Click 'Get Location' or enter manually"
                />
                {errors.latitude && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.latitude.message}
                  </p>
                )}
              </div>

              {/* Longitude */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Longitude
                </label>
                <input
                  {...register("longitude")}
                  type="text"
                  id="longitude"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Click 'Get Location' or enter manually"
                />
                {errors.longitude && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.longitude.message}
                  </p>
                )}
              </div>

              {/* Location Image */}
              <div>
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="preview image"
                    width={100}
                    height={100}
                    priority
                    className="object-cover object-center rounded-sm"
                  />
                )}
                <label className="block text-sm text-gray-600 mb-1">
                  Location Image
                </label>
                <input
                //   {...register("locationImage")}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full border rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                />
                {errors.locationImage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.locationImage.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-sm transition"
            >
              {isSubmitting ? "Location Adding..." : "Add Location"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

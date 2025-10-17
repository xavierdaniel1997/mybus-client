"use client";

import {BusLayout} from "@/app/types/bus";
import {api} from "@/lib/api";
import {handleApiError} from "@/lib/utils/handleApiError";
import {JSX, useEffect, useState} from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import ImageUploader from "../common/ImageUploader";
import SeatTypeLegend from "../SeatLayout/SeatTypeLegend";
import { FaWifi, FaChargingStation, FaBottleWater, FaBed, FaCookieBite, FaLightbulb, FaVideo } from "react-icons/fa6";
import { GiPillow } from "react-icons/gi";


export default function StepBusDetails() {
  const [busLayout, setBusLayout] = useState<BusLayout[]>([]);
  const [selectLayout, setSelectLayout] = useState<BusLayout | null>(null);
  const [busImages, setBusImages] = useState<File[]>([]);


  const featureIcons: Record<string, JSX.Element> = {
  wifi: <FaWifi className="text-blue-500 text-xl" />,
  chargingPoint: <FaChargingStation className="text-yellow-500 text-xl" />,
  waterBottle: <FaBottleWater className="text-blue-400 text-xl" />,
  blankets: <FaBed className="text-purple-500 text-xl" />,
  snacks: <FaCookieBite className="text-orange-500 text-xl" />,
  readingLight: <FaLightbulb className="text-amber-400 text-xl" />,
  cctv: <FaVideo className="text-red-500 text-xl" />,
  pillow: <GiPillow className="text-pink-400 text-xl" />,
};


    // form state
  const [busDetails, setBusDetails] = useState({
    name: "",
    registrationNo: "",
    brand: "",
    busType: "",
    layoutId: "",
    information: "",
    features: {
      wifi: false,
      chargingPoint: false,
      waterBottle: false,
      blankets: false,
      snacks: false,
      readingLight: false,
      cctv: false,
      pillow: false,
    },
  });

  const getSeatingLayout = async () => {
    try {
      const response = await api.get("bustype/get-all-layouts");
      setBusLayout(response.data.bustypeLayout);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    getSeatingLayout();
  }, []);


   // handle text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({ ...prev, [name]: value }));
  };

  // handle checkbox
  const handleFeatureChange = (feature: string) => {
    setBusDetails((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature as keyof typeof prev.features] },
    }));
  };


   // 🧠 handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // append text fields
      formData.append("name", busDetails.name);
      formData.append("registrationNo", busDetails.registrationNo);
      formData.append("brand", busDetails.brand);
      formData.append("busType", busDetails.busType);
      formData.append("layoutId", busDetails.layoutId);
      formData.append("information", busDetails.information);
      formData.append("features", JSON.stringify(busDetails.features));

      // append images
      busImages.forEach((file) => {
        formData.append("images", file);
      });

      const response = await api.post("bus/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Bus created successfully:", response.data);
      alert("Bus created successfully!");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleLayoutSelect = (id: string) => {
    const layout = busLayout.find((layout) => layout._id === id);
    setSelectLayout(layout || null);
  };

  const totalSeats =
  (selectLayout?.lowerDeck?.reduce((sum, row) => sum + row.length, 0) || 0) +
  (selectLayout?.upperDeck?.reduce((sum, row) => sum + row.length, 0) || 0);

  console.log("selected seating layout", totalSeats);

  return (
    <div className="flex bg-gray-100/70 rounded-md px-8 py-5 gap-10 text-gray-600">
      <div className="space-y-3 flex-1/2">
        <h3>Details</h3>
        {/* Bus Name */}
        <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Bus Name</label>
          </div>
          <input
          name="name"
          value={busDetails.name}
              onChange={handleChange}
            type="text"
            className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="Bus name"
          />
        </div>

        {/* Bus Registration No */}
        <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Registration</label>
          </div>
          <input
                        name="registrationNo"
              value={busDetails.registrationNo}
              onChange={handleChange}
            type="text"
            className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="xxxxxx"
          />
        </div>

        {/* Brand */}
        <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Vehile Brand</label>
          </div>
          <input
            type="text"
             name="brand"
              value={busDetails.brand}
              onChange={handleChange}
            className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="Volvo"
          />
        </div>

          <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Bus Type</label>
          </div>
          <select name="busType"
              value={busDetails.busType}
              onChange={handleChange}
               className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none">
          <option value="">Select bus type</option>
              <option value="sleeper">Sleeper</option>
              <option value="sleeper+seater">Sleeper + Seater</option>
              <option value="seater">Seater</option>
          </select>
        </div>

        <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Seating Layout</label>
          </div>
          <select
            className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            name="layoutId"
              value={busDetails.layoutId}
            onChange={(e) => handleLayoutSelect(e.target.value)}
          >
            <option>select layout</option>
            {busLayout.map((layout: BusLayout) => (
              <option key={layout._id} value={layout._id}>
                {layout.name}
              </option>
            ))}
          </select>
        </div>

         <h3>Features</h3>

         {/* <div className="flex flex-wrap gap-4 items-center">
         <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">WiFi</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Charging Point</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Water Bottle</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Blankets</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Snacks</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Reading Light</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">CCTV</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 p-0 m-0">Pillow</label>
          <input
            type="checkbox"
            className="border rounded-sm p-2 h-4 w-4"
          />
        </div>

        </div> */}

       {/* 🧩 Selected Feature Icons Container */}
{Object.entries(busDetails.features).some(([_, value]) => value) && (
  <div className="">
    <h3 className="text-gray-700 text-sm font-semibold mb-2">Selected Features</h3>
    <div className="flex flex-wrap gap-4">
      {Object.entries(busDetails.features).map(([feature, value]) =>
        value ? (
          <div
            key={feature}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            {featureIcons[feature]}
            <span className="text-gray-700 text-sm capitalize">
              {feature.replace(/([A-Z])/g, " $1")}
            </span>
          </div>
        ) : null
      )}
    </div>
  </div>
)}




         <div className="flex flex-wrap gap-4">
            {Object.entries(busDetails.features).map(([feature, value]) => (
              <label key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleFeatureChange(feature)}
                  className="h-4 w-4 border rounded-sm"
                />
                {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>

         <div>
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">Information</label>
          </div>
          <textarea  
            className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="New Bus"
            rows={3}
          />
        </div>

        {/*left section end  */}
      </div>
      {/* right section */}
      <div className="space-y-3 flex-1/2">
        <div>
         <h3 className="mb-2">Drag and drop the images of bus</h3>
          <div>
            <ImageUploader
              onChange={(files) => console.log("Selected bus images:", files)}
            />
          </div>
        </div>

        {/* show selected layout */}
        <div className="flex gap-10">
          {selectLayout?.lowerDeck && (
            <div>
              <p className="text-center mb-1">Lower deck</p>
              <SeatGrid layout={selectLayout?.lowerDeck} isUpperDeck={false} />
            </div>
          )}
          {selectLayout?.upperDeck && selectLayout.upperDeck.length > 0 && (
            <div>
              <p className="text-center mb-1">Upper deck</p>
              <SeatGrid layout={selectLayout?.upperDeck} isUpperDeck={true} />
            </div>
          )}
        </div>
      </div>

      {/* last row */}
      <div>
        <SeatTypeLegend totalSeat={totalSeats}/>
      </div>
    </div>
  );
}

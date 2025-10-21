"use client";

import {BusLayout} from "@/app/types/bus";
import {api} from "@/lib/api";
import {handleApiError} from "@/lib/utils/handleApiError";
import {forwardRef, JSX, useEffect, useImperativeHandle, useState} from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import ImageUploader from "../common/ImageUploader";
import SeatTypeLegend from "../SeatLayout/SeatTypeLegend";
import {
  FaWifi,
  FaChargingStation,
  FaBottleWater,
  FaBed,
  FaCookieBite,
  FaLightbulb,
  FaVideo,
  FaBus,
} from "react-icons/fa6";
import {GiPillow} from "react-icons/gi";
import {toast} from "sonner";
import {BusDetails, StepBusDetailsRef} from "@/app/types/addBusType";

interface StepBusDetailsProps {
  busDetails: BusDetails;
  setBusDetails: React.Dispatch<React.SetStateAction<BusDetails>>;
  busId: string | null;
  setBusId: React.Dispatch<React.SetStateAction<string | null>>;
}

const StepBusDetails = forwardRef<StepBusDetailsRef, StepBusDetailsProps>(
  ({busDetails, setBusDetails, busId, setBusId}, ref) => {
    const [busLayout, setBusLayout] = useState<BusLayout[]>([]);
    const [selectLayout, setSelectLayout] = useState<BusLayout | null>(null);
    const [busImages, setBusImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const {name, value} = e.target;
      setBusDetails((prev) => ({...prev, [name]: value}));
    };

    // handle checkbox
    const handleFeatureChange = (feature: string) => {
      setBusDetails((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [feature]: !prev.features[feature as keyof typeof prev.features],
        },
      }));
    };

    // handle form submission
    const saveBus = async (): Promise<boolean> => {
      try {
        setIsLoading(true);
        const formData = new FormData();
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

        // const response = await api.post("/mybus/add-new-bus", formData, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        // toast.success(response.data.message)
        // return response.data.data?._id || true

        let response;

        // ✅ Check if busId exists -> update, else create
        if (busId) {
          response = await api.put(`/mybus/update-bus/${busId}`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
          });
          toast.success("Bus details updated successfully");
        } else {
          response = await api.post("/mybus/add-new-bus", formData, {
            headers: {"Content-Type": "multipart/form-data"},
          });
          toast.success("Bus created successfully");
        }

        const id = response.data?.data?._id || busId || true;
        return id;
      } catch (error) {
        setIsLoading(false);
        handleApiError(error);
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      createBus: saveBus,
    }));

    // useEffect(() => {
    //   const fetchBusDetails = async () => {
    //     if (busId) {
    //       const response = await api.get(`/mybus/get-bus/${busId}`);
    //       console.log("respons from the get bus details..............", response);
    //       setBusDetails(response.data.data);
    //     }
    //   };
    //   fetchBusDetails();
    // }, [busId]);

    useEffect(() => {
  const fetchBusDetails = async () => {
    if (busId) {
      const response = await api.get(`/mybus/get-bus/${busId}`);
      console.log("response from get bus details..............", response);

      const busData = response.data.data;
      setBusDetails(busData);

      // ✅ If busLayout already loaded, find and set the layout
      if (busLayout.length > 0) {
        const selected = busLayout.find(
          (layout) => layout.name === busData.layoutName || layout._id === busData.layoutId
        );
        if (selected) setSelectLayout(selected);
      }
    }
  };
  fetchBusDetails();
}, [busId, busLayout]);


    const handleLayoutSelect = (id: string) => {
      const layout = busLayout.find((layout) => layout._id === id);
      setSelectLayout(layout || null);
      setBusDetails((prev) => ({
        ...prev,
        layoutId: id,
      }));
    };

    const totalSeats =
      (selectLayout?.lowerDeck?.reduce((sum, row) => sum + row.length, 0) ||
        0) +
      (selectLayout?.upperDeck?.reduce((sum, row) => sum + row.length, 0) || 0);

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
            <select
              name="busType"
              value={busDetails.busType}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            >
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

          {/* Selected Feature Icons Container */}
          {Object.entries(busDetails.features).some(([_, value]) => value) && (
            <div className="">
              <h3 className="text-gray-700 text-sm font-semibold mb-2">
                Selected Features
              </h3>
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
              <label
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleFeatureChange(feature)}
                  className="h-4 w-4 border rounded-sm"
                />
                {feature.charAt(0).toUpperCase() +
                  feature.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>

          <div>
            <div className="flex flex-col mb-1">
              <label className="text-sm text-gray-600">Information</label>
            </div>
            <textarea
              name="information"
              value={busDetails.information}
              onChange={handleChange}
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
                onChange={(files) => setBusImages(files)}
                busImages={busDetails?.images || []}
              />
            </div>
          </div>

          {/* show selected layout */}
          <div className="flex gap-10">
            {selectLayout?.lowerDeck && (
              <div>
                <p className="text-center mb-1">Lower deck</p>
                <SeatGrid
                  layout={selectLayout?.lowerDeck}
                  isUpperDeck={false}
                />
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
        <div className="flex flex-col justify-between">
          <SeatTypeLegend totalSeat={totalSeats} />
          <div>
            {isLoading && (
              <button
                className="bg-blue-600 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-50 min-w-[120px] transition hover:bg-blue-700 disabled:opacity-70"
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  <FaBus className="text-white text-xl animate-busRun" />
                  <span>Running...</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

StepBusDetails.displayName = "StepBusDetails";
export default StepBusDetails;

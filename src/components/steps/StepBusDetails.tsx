"use client";

import { BusLayout } from "@/app/types/bus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import ImageUploader from "../common/ImageUploader";
import SeatTypeLegend from "../SeatLayout/SeatTypeLegend";
import { FaBus } from "react-icons/fa6";
import { toast } from "sonner";
import { BusDetails, StepBusDetailsRef } from "@/app/types/addBusType";
import { featureIcons } from "../bus/FeatureIcons";
import { IBus } from "@/app/types/myBus";

interface StepBusDetailsProps {
  busDetails: BusDetails;
  setBusDetails: React.Dispatch<React.SetStateAction<BusDetails>>;
  busId: string | null;
  setBusId: React.Dispatch<React.SetStateAction<string | null>>;
}

const StepBusDetails = forwardRef<StepBusDetailsRef, StepBusDetailsProps>(
  ({ busDetails, setBusDetails, busId, setBusId }, ref) => {
    const [busLayout, setBusLayout] = useState<BusLayout[]>([]);
    const [selectLayout, setSelectLayout] = useState<BusLayout | null>(null);
    const [busImages, setBusImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // NEW
    const [buses, setBuses] = useState<IBus[]>([]);
    const [selectedExistingBusId, setSelectedExistingBusId] = useState<string | null>(null);

    const getAllBuses = async () => {
      try {
        const response = await api.get("/mybus/all-buses");
        setBuses(response.data.buses || []);
      } catch (error) {
        handleApiError(error);
      }
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
      getAllBuses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setBusDetails((prev) => ({ ...prev, [name]: value }));
    };

    const areAllFeaturesEnabled = Object.values(busDetails.features || {}).every(Boolean);

    const handleSelectAllChange = () => {
      setBusDetails((prev) => {
        const features = prev.features || {};
        const newFeatures = Object.fromEntries(
          Object.keys(features).map((key) => [key, !areAllFeaturesEnabled])
        ) as BusDetails["features"];
        return { ...prev, features: newFeatures };
      });
    };

    const handleFeatureChange = (feature: string) => {
      setBusDetails((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [feature]: !prev.features[feature as keyof typeof prev.features],
        },
      }));
    };

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

        busImages.forEach((file) => formData.append("images", file));

        let response;
        if (busId) {
          response = await api.put(`/mybus/update-bus/${busId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Bus updated");
        } else {
          response = await api.post(`/mybus/add-new-bus`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Bus created");
        }

        const id = response.data?.data?._id || busId || true;
        return id;
      } catch (error) {
        handleApiError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      createBus: saveBus,
    }));

    useEffect(() => {
      const fetchBusDetails = async () => {
        if (!busId) return;

        const response = await api.get(`/mybus/get-bus/${busId}`);
        const busData = response.data.data;
        setBusDetails(busData);

        if (busLayout.length > 0) {
          const selected = busLayout.find(
            (layout) => layout._id === busData.layoutId || layout.name === busData.layoutName
          );
          if (selected) setSelectLayout(selected);
        }
      };
      fetchBusDetails();
    }, [busId, busLayout]);

    // NEW: Handle selecting existing bus
    const handleExistingBusSelect = (id: string) => {

      if (id === "__new") {
    setSelectedExistingBusId(null);
    setBusId(null);

    // Reset fields to empty values
    setBusDetails({
      name: "",
      registrationNo: "",
      brand: "",
      busType: "",
      layoutId: "",
      information: "",
      features: Object.fromEntries(
        Object.keys(busDetails.features).map((f) => [f, false])
      ),
      images: []
    });

    setSelectLayout(null);
    return;
  }
      setSelectedExistingBusId(id);
      setBusId(id);

      const selectedBus = buses.find((b) => b._id === id);
      if (!selectedBus) return;

      // setBusDetails({
      //   ...busDetails,
      //   ...selectedBus,
      // });
      

      // console.log("checking the selectedBus details....", selectedBus, "and busLayout", busLayout)

      // const selectedLayout = busLayout.find((l) => l._id === selectedBus.layoutId);
      // console.log("selectedLayout................", selectLayout)
      // if (selectedLayout) setSelectLayout(selectedLayout);
    };

    const countSeats = (deck?: { type: string }[][]) =>
      deck?.flat()?.filter((s) => s.type !== "Aisle")?.length || 0;

    const totalSeats =
      countSeats(selectLayout?.lowerDeck) + countSeats(selectLayout?.upperDeck);

    return (
      <div className="flex bg-gray-100/70 rounded-md px-8 py-5 gap-10 text-gray-600">

        {/* LEFT PANEL */}
        <div className="space-y-3 flex-1/2">

          {/* NEW: Select existing bus */}
          <div>
            <label className="text-sm text-gray-600">Select Existing Bus</label>
            <select
              className="w-full border rounded-sm py-1.5 px-1 mt-1"
              value={selectedExistingBusId || ""}
              onChange={(e) => handleExistingBusSelect(e.target.value)}
            >
              <option value="__new">➕ Create New Bus</option>
              <option value="">Choose a bus</option>
              {buses.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus.name} — {bus.registrationNo}
                </option>
              ))}
            </select>
          </div>

          {selectedExistingBusId && (
            <p className="text-sm text-blue-700 font-medium">
              Selected Bus: {buses.find(b=>b._id===selectedExistingBusId)?.name}
            </p>
          )}

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Bus Name</label>
            <input
              name="name"
              value={busDetails.name}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1"
              placeholder="Bus name"
            />
          </div>

          {/* Registration */}
          <div>
            <label className="text-sm text-gray-600">Registration</label>
            <input
              name="registrationNo"
              value={busDetails.registrationNo}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1"
              placeholder="KL-07-XXX"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm text-gray-600">Vehicle Brand</label>
            <input
              name="brand"
              value={busDetails.brand}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1"
              placeholder="Volvo"
            />
          </div>

          {/* Bus Type */}
          <div>
            <label className="text-sm text-gray-600">Bus Type</label>
            <select
              name="busType"
              value={busDetails.busType}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1"
            >
              <option value="">Select bus type</option>
              <option value="sleeper">Sleeper</option>
              <option value="sleeper+seater">Sleeper + Seater</option>
              <option value="seater">Seater</option>
            </select>
          </div>

          {/* Layout */}
          <div>
            <label className="text-sm text-gray-600">Seating Layout</label>
            <select
              name="layoutId"
              value={busDetails.layoutId}
              onChange={(e) => {
  const layoutId = e.target.value;
  setBusDetails(prev => ({ ...prev, layoutId }));
  const selected = busLayout.find(l => l._id === layoutId);
  setSelectLayout(selected || null);
}}

              className="w-full border rounded-sm py-1.5 px-1"
            >
              <option>Select layout</option>
              {busLayout.map((layout) => (
                <option key={layout._id} value={layout._id}>
                  {layout.name}
                </option>
              ))}
            </select>
          </div>

          {/* Features */}
          <h3>Features</h3>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={areAllFeaturesEnabled}
              onChange={handleSelectAllChange}
              className="h-4 w-4"
            />
            Select All
          </label>

          {Object.entries(busDetails.features).some(([_, v]) => v) && (
            <div>
              <h3 className="text-sm mb-2">Selected Features</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(busDetails.features).map(
                  ([feature, value]) =>
                    value && (
                      <div
                        key={feature}
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-gray-50"
                      >
                        {featureIcons[feature]}
                        <span className="text-sm">{feature}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {Object.entries(busDetails.features).map(([feature, value]) => (
              <label key={feature} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleFeatureChange(feature)}
                />
                {feature}
              </label>
            ))}
          </div>

          {/* Info */}
          <div>
            <label className="text-sm text-gray-600">Information</label>
            <textarea
              name="information"
              value={busDetails.information}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1"
              rows={3}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-3 flex-1/2">
          <div>
            <h3 className="mb-2">Drag and drop bus images</h3>
            <ImageUploader
              onChange={(files) => setBusImages(files)}
              busImages={busDetails?.images || []}
            />
          </div>

          <div className="flex gap-10">
            {selectLayout?.lowerDeck && (
              <div>
                <p className="text-center mb-1">Lower deck</p>
                <SeatGrid layout={selectLayout.lowerDeck} isUpperDeck={false} />
              </div>
            )}

            {selectLayout?.upperDeck && selectLayout.upperDeck.length > 0 && (
              <div>
                <p className="text-center mb-1">Upper deck</p>
                <SeatGrid layout={selectLayout.upperDeck} isUpperDeck={true} />
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col justify-between">
          <SeatTypeLegend totalSeat={totalSeats} />

          {isLoading && (
            <button
              className="bg-blue-600 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white min-w-[120px]"
              disabled
            >
              <FaBus className="text-xl animate-busRun" />
              Uploading...
            </button>
          )}
        </div>
      </div>
    );
  }
);

StepBusDetails.displayName = "StepBusDetails";
export default StepBusDetails;

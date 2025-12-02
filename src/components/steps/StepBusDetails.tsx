"use client";

import { BusLayout } from "@/app/types/bus";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  ChangeEvent,
} from "react";
import SeatGrid from "../SeatLayout/SeatGrid";
import ImageUploader from "../common/ImageUploader";
import SeatTypeLegend from "../SeatLayout/SeatTypeLegend";
import { FaBus } from "react-icons/fa6";
import { toast } from "sonner";
import {
  BusDetails,
  BusFeatures,
  StepBusDetailsRef,
} from "@/app/types/addBusType";
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

    const [buses, setBuses] = useState<IBus[]>([]);
    const [selectedExistingBusId, setSelectedExistingBusId] = useState<
      string | null
    >(null);

    // Default features
    const defaultFeatures = {
      wifi: false,
      chargingPoint: false,
      waterBottle: false,
      blankets: false,
      snacks: false,
      readingLight: false,
      cctv: false,
      pillow: false,
    };

    // Fetch existing buses
    const getAllBuses = async () => {
      try {
        const response = await api.get("/mybus/all-buses");
        setBuses(response.data.buses || []);
      } catch (error) {
        handleApiError(error);
      }
    };

    // Fetch seating layouts
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

    // Update fields
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setBusDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Select all features
    const areAllFeaturesEnabled = Object.values(
      busDetails.features ?? {}
    ).every(Boolean);

    const handleSelectAllChange = () => {
      const toggled = !areAllFeaturesEnabled;
      const newFeatures = Object.fromEntries(
        Object.keys(defaultFeatures).map((key) => [key, toggled])
      );
      setBusDetails((prev) => ({ ...prev, features: newFeatures }));
    };

    // Toggle individual feature
    const handleFeatureChange = (feature: keyof BusFeatures) => {
      setBusDetails((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [feature]: !prev.features?.[feature],
        },
      }));
    };

    // Save bus (new or update)
    // const saveBus = async (): Promise<string | boolean> => {
    //   try {
    //     setIsLoading(true);

    //     const formData = new FormData();
    //     formData.append("name", busDetails.name);
    //     formData.append("registrationNo", busDetails.registrationNo);
    //     formData.append("brand", busDetails.brand);
    //     formData.append("busType", busDetails.busType);
    //     formData.append("information", busDetails.information);
    //     formData.append("features", JSON.stringify(busDetails.features));

    //     if (!busId && busDetails.layoutId) {
    //       formData.append("layoutId", busDetails.layoutId);
    //     }

    //      formData.append("features", JSON.stringify(busDetails.features ?? {}));

    //     busImages.forEach((file) => formData.append("images", file));

    //     let response;

    //     if (busId) {
    //       response = await api.put(`/mybus/update-bus/${busId}`, formData);
    //       toast.success("Bus updated");
    //     } else {
    //       response = await api.post(`/mybus/add-new-bus`, formData);
    //       toast.success("Bus created");
    //     }

    //     return response.data?.data?._id || busId || "";
    //   } catch (error) {
    //     handleApiError(error);
    //     return false;
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    const saveBus = async (): Promise<string | boolean> => {
      try {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", busDetails.name);
        formData.append("registrationNo", busDetails.registrationNo);
        formData.append("brand", busDetails.brand);
        formData.append("busType", busDetails.busType);
        formData.append("information", busDetails.information);

        // ✅ FIX 1: append layoutId when creating new bus
        if (!busId && busDetails.layoutId) {
          formData.append("layoutId", busDetails.layoutId);
        }

        // ✅ FIX 2: REMOVE DUPLICATE OR BAD JSON — append features only once
        formData.append("features", JSON.stringify(busDetails.features ?? {}));

        busImages.forEach((file) => formData.append("images", file));
        console.log("busImages before upload:", busImages);
        for (const [k, v] of formData.entries()) {
          console.log(k, v);
        }

        let response;
        if (busId) {
          response = await api.put(`/mybus/update-bus/${busId}`, formData);
          toast.success("Bus updated");
        } else {
          response = await api.post(`/mybus/add-new-bus`, formData, {
             headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Bus created");
        }

        return response.data?.data?._id || "";
      } catch (error) {
        handleApiError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    // Expose createBus to parent
    useImperativeHandle(ref, () => ({
      createBus: async () => {
        if (selectedExistingBusId && !busId) return selectedExistingBusId;
        return await saveBus();
      },
    }));

    // Normalize bus object
    const normalizeBus = (data: Partial<IBus> = {}): BusDetails => ({
      name: data.name || "",
      registrationNo: data.registrationNo || "",
      brand: data.brand || "",
      busType: data.busType || "",
      layoutId: "", // no longer used
      information: data.information || "",
      images: data.images || [],
      features: {
        ...defaultFeatures,
        ...(data.features || {}),
      },
    });

    const resetNew = () => {
      setSelectedExistingBusId(null);
      setBusId(null);
      setSelectLayout(null);
      setBusDetails(normalizeBus({}));
    };

    // MAIN FIX: Load layout using layoutName
    const handleExistingBusChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;

      if (!value || value === "__new") {
        resetNew();
        return;
      }

      setSelectedExistingBusId(value);
      setBusId(value);

      const selected = buses.find((b) => b._id === value);
      if (!selected) return;

      const normalized = normalizeBus(selected);
      setBusDetails(normalized);

      // 1️⃣ Find layout by layoutName (case-insensitive)
      const layoutByName = busLayout.find(
        (l) =>
          l.name.trim().toLowerCase() ===
          (selected.layoutName || "").trim().toLowerCase()
      );

      if (layoutByName) {
        setSelectLayout(layoutByName);
        return;
      }

      // 2️⃣ Fallback: use embedded seating structure
      if (selected.lowerDeck || selected.upperDeck) {
        setSelectLayout({
          _id: selected._id,
          name: selected.layoutName,
          lowerDeck: selected.lowerDeck?.seats || [],
          upperDeck: selected.upperDeck?.seats || [],
        } as unknown as BusLayout);
        return;
      }

      setSelectLayout(null);
    };

    // Count seats
    const countSeats = (deck?: { type: string }[][]) =>
      deck?.flat()?.filter((s) => s.type !== "Aisle")?.length || 0;

    const totalSeats =
      countSeats(selectLayout?.lowerDeck) + countSeats(selectLayout?.upperDeck);

    const isExisting = !!selectedExistingBusId;

    return (
      <div className="flex bg-gray-100/70 rounded-md px-8 py-5 gap-10 text-gray-600">
        {/* LEFT PANEL */}
        <div className="space-y-3 flex-1/2">
          {/* Existing bus select */}
          <div>
            <label className="text-sm">Select Existing Bus</label>
            <select
              className="w-full border rounded-sm py-1.5 px-1 mt-1"
              value={selectedExistingBusId || ""}
              onChange={handleExistingBusChange}
            >
              <option value="__new">➕ Create New Bus</option>
              {buses.map((bus) => (
                <option key={bus._id} value={bus._id}>
                  {bus.name} — {bus.registrationNo}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm">Bus Name</label>
            <input
              name="name"
              disabled={isExisting}
              value={busDetails.name}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1 disabled:bg-gray-200"
            />
          </div>

          {/* Registration */}
          <div>
            <label className="text-sm">Registration</label>
            <input
              name="registrationNo"
              disabled={isExisting}
              value={busDetails.registrationNo}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1 disabled:bg-gray-200"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-sm">Vehicle Brand</label>
            <input
              disabled={isExisting}
              name="brand"
              value={busDetails.brand}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1 disabled:bg-gray-200"
            />
          </div>

          {/* Bus Type */}
          <div>
            <label className="text-sm">Bus Type</label>
            <select
              disabled={isExisting}
              name="busType"
              value={busDetails.busType}
              onChange={handleChange}
              className="w-full border rounded-sm py-1.5 px-1 disabled:bg-gray-200"
            >
              <option value="">Select type</option>
              <option value="sleeper">Sleeper</option>
              <option value="sleeper+seater">Sleeper + Seater</option>
              <option value="seater">Seater</option>
            </select>
          </div>

          {/* LAYOUT (NO LONGER USED FOR EXISTING) */}
          <div>
            <label className="text-sm">Seating Layout</label>
            <select
              disabled={isExisting}
              name="layoutId"
              value={busDetails.layoutId}
              onChange={(e) => {
                const id = e.target.value;
                setBusDetails((p) => ({ ...p, layoutId: id }));
                const layout = busLayout.find((l) => l._id === id);
                setSelectLayout(layout || null);
              }}
              className="w-full border rounded-sm py-1.5 px-1 disabled:bg-gray-200"
            >
              <option value="">Select layout</option>
              {busLayout.map((layout) => (
                <option key={layout._id} value={layout._id}>
                  {layout.name}
                </option>
              ))}
            </select>
          </div>

          {/* FEATURES */}
          <h3 className="font-semibold">Features</h3>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              disabled={isExisting}
              checked={areAllFeaturesEnabled}
              onChange={handleSelectAllChange}
            />
            Select All
          </label>

          <div className="flex flex-wrap gap-4">
            {(
              Object.entries(busDetails.features ?? {}) as [
                keyof BusFeatures,
                boolean
              ][]
            ).map(([f, v]) => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  disabled={isExisting}
                  checked={v}
                  onChange={() => handleFeatureChange(f)}
                />
                {f}
              </label>
            ))}
          </div>

          {/* Info */}
          <div>
            <label className="text-sm">Information</label>
            <textarea
              disabled={isExisting}
              name="information"
              value={busDetails.information}
              onChange={handleChange}
              className="w-full border rounded-sm py-1 px-1 disabled:bg-gray-200"
              rows={3}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-3 flex-1/2">
          <div>
            <h3 className="mb-2">Upload images</h3>
            <ImageUploader
              onChange={(files) => setBusImages(files)}
              busImages={busDetails?.images || []}
            />
          </div>

          <div className="flex gap-10">
            {selectLayout?.lowerDeck && (
              <div>
                <p className="text-center">Lower deck</p>
                <SeatGrid layout={selectLayout.lowerDeck} isUpperDeck={false} />
              </div>
            )}

            {selectLayout?.upperDeck && (
              <div>
                <p className="text-center">Upper deck</p>
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
              className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2 items-center"
              disabled
            >
              <FaBus className="animate-busRun" /> Uploading...
            </button>
          )}
        </div>
      </div>
    );
  }
);

StepBusDetails.displayName = "StepBusDetails";
export default StepBusDetails;

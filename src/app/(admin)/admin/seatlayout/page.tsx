"use client";

import {FaRegSave} from "react-icons/fa";
import {useState} from "react";
import SeatTypeLegend from "@/components/SeatLayout/SeatTypeLegend";
import SeatGrid from "@/components/SeatLayout/SeatGrid";
import {toast} from "sonner";
import {handleApiError} from "@/lib/utils/handleApiError";
import {api} from "@/lib/api";

export default function SeatLayout() {
  const [leftCols, setLeftCols] = useState(2);
  const [leftRows, setLeftRows] = useState(6);
  const [rightCols, setRightCols] = useState(2);
  const [rightRows, setRightRows] = useState(6);
  const [busBrand, setBusBrand] = useState("");
  const [busType, setBusType] = useState("seater");
  const [deck, setDeck] = useState(1);
  const [extraRows, setExtraRows] = useState(3);

  const [layoutLower, setLayoutLower] = useState<
    {id: string; type: string; seatNumber: string}[][]
  >([]);
  const [layoutUpper, setLayoutUpper] = useState<
    {id: string; type: string; seatNumber: string}[][]
  >([]);

  /**
   * 🔹 Helper to generate a deck layout
   * @param type "seater" | "sleeper"
   * @param deckLevel "L" | "U"
   */
  const generateBaseLayout = (type: string, deckLevel: "L" | "U") => {
    const newLayout: {id: string; type: string; seatNumber: string}[][] = [];
    const maxRows = Math.max(leftRows, rightRows);
    const maxCols = leftCols + rightCols + 1;

    for (let col = 0; col < maxCols; col++) {
      newLayout.push([]);
    }

    let leftSeatNumber = 1;
    let rightSeatNumber = 1;

    for (let row = 0; row < maxRows; row++) {
      // Left side
      for (let col = 0; col < leftCols; col++) {
        newLayout[col].push({
          id: `${deckLevel}L${leftSeatNumber}`,
          type,
          seatNumber: `${deckLevel}L${leftSeatNumber}`,
        });
        leftSeatNumber++;
      }

      // Aisle
      newLayout[leftCols].push({
        id: "Aisle",
        type: "Aisle",
        seatNumber: "Aisle",
      });

      // Right side
      for (let col = 0; col < rightCols; col++) {
        newLayout[leftCols + 1 + col].push({
          id: `${deckLevel}R${rightSeatNumber}`,
          type,
          seatNumber: `${deckLevel}R${rightSeatNumber}`,
        });
        rightSeatNumber++;
      }
    }

    return newLayout;
  };

  // 🔹 Main Layout Generator
  const generateLayout = () => {
    if (busType === "seater") {
      setDeck(1);
      setLayoutLower(generateBaseLayout("seater", "L"));
      setLayoutUpper([]);
    } else if (busType === "sleeper") {
      setDeck(2);
      setLayoutLower(generateBaseLayout("sleeper", "L"));
      setLayoutUpper(generateBaseLayout("sleeper", "U"));
    } else if (busType === "seater+sleeper") {
      setDeck(2);

      // --- Base layouts ---
      const lowerLayout = generateBaseLayout("seater", "L");
      const upperLayout = generateBaseLayout("sleeper", "U");

      // --- Add extra rows to lower deck (seater) ---
      const maxCols = leftCols + rightCols + 1;
      const extraLayout: {id: string; type: string; seatNumber: string}[][] =
        Array.from({length: maxCols}, () => []);

      let extraLeftSeat =
        lowerLayout.flat().filter((s) => s.id.startsWith("LL")).length + 1;
      let extraRightSeat =
        lowerLayout.flat().filter((s) => s.id.startsWith("LR")).length + 1;

      for (let row = 0; row < extraRows; row++) {
        // Left side
        for (let col = 0; col < leftCols; col++) {
          extraLayout[col].push({
            id: `LL${extraLeftSeat}`,
            type: "seater",
            seatNumber: `LL${extraLeftSeat}`,
          });
          extraLeftSeat++;
        }

        // Aisle
        extraLayout[leftCols].push({
          id: "Aisle",
          type: "Aisle",
          seatNumber: "Aisle",
        });

        // Right side
        for (let col = 0; col < rightCols; col++) {
          extraLayout[leftCols + 1 + col].push({
            id: `LR${extraRightSeat}`,
            type: "seater",
            seatNumber: `LR${extraRightSeat}`,
          });
          extraRightSeat++;
        }
      }

      // Combine layouts (base + extra)
      const updatedLower = lowerLayout.map((col, i) => [
        ...col,
        ...extraLayout[i],
      ]);

      setLayoutLower(updatedLower);
      setLayoutUpper(upperLayout);
    }
  };

  // 🔹 Clear layout
  const clearLayout = () => {
    setLayoutLower([]);
    setLayoutUpper([]);
  };

  const handleSave = async () => {
    if (layoutLower.length === 0) {
      toast.error("Generate the layout first!");
      return;
    }
    const layoutName = `${leftCols}+${rightCols} ${
      busType.charAt(0).toUpperCase() + busType.slice(1)
    } ${busBrand}`;
    const payload = {
      name: layoutName,
      busType,
      leftCols,
      leftRows,
      rightCols,
      rightRows,
      extraRows: busType === "seater+sleeper" ? extraRows : 0,
      lowerDeck: layoutLower,
      upperDeck: layoutUpper,
    };
    try {
      const response = await api.post("bustype/create-layout", payload);
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      // handleApiError(error)
      console.log("error from the create layout ", error);
    }
  };

  return (
    <div className="px-20 py-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">
          Create Seating Layout
        </h1>
        <button
          className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2"
          onClick={handleSave}
        >
          <FaRegSave /> Save
        </button>
      </div>

      {/* Form Section */}
      <div className="mt-10 flex flex-wrap gap-5 items-end">
        {/* Bus Brand */}
        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">Bus Brand</label>
          <input
            type="text"
            className="w-40 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            placeholder="SCANIA"
            value={busBrand}
            onChange={(e) => setBusBrand(e.target.value)}
          />
        </div>

        {/* Bus Type */}
        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">Bus Type</label>
          <select
            className="border rounded-sm p-1.5 focus:ring focus:ring-blue-500 outline-none"
            value={busType}
            onChange={(e) => setBusType(e.target.value)}
          >
            <option value="" disabled>
              Select Bus Type
            </option>
            <option value="seater">Seater</option>
            <option value="seater+sleeper">Seater / Sleeper</option>
            <option value="sleeper">Sleeper</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">L Cols</label>
          <input
            type="number"
            className="w-20 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            value={leftCols}
            onChange={(e) => setLeftCols(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">L Rows</label>
          <input
            type="number"
            className="w-20 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            value={leftRows}
            onChange={(e) => setLeftRows(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">R Cols</label>
          <input
            type="number"
            className="w-20 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            value={rightCols}
            onChange={(e) => setRightCols(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col mb-1">
          <label className="text-sm text-gray-600">R Rows</label>
          <input
            type="number"
            className="w-20 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
            value={rightRows}
            onChange={(e) => setRightRows(Number(e.target.value))}
          />
        </div>

        {/* Extra Rows Input (Visible for seater+sleeper) */}
        {busType === "seater+sleeper" && (
          <div className="flex flex-col mb-1">
            <label className="text-sm text-gray-600">
              Extra Rows (Lower Deck)
            </label>
            <input
              type="number"
              className="w-24 border rounded-sm py-1.5 px-1 focus:ring focus:ring-blue-500 outline-none"
              value={extraRows}
              onChange={(e) => setExtraRows(Number(e.target.value))}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mb-1">
          <button
            onClick={generateLayout}
            className="p-1.5 px-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md"
          >
            Generate
          </button>
          <button
            onClick={clearLayout}
            className="p-1.5 bg-blue-700 hover:bg-blue-600 text-gray-50 rounded-md"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Layout Display */}
      <div className="mt-10 flex justify-between items-start">
        <div className="flex gap-20">
          {layoutLower.length > 0 && (
            <div>
              <h2 className="font-semibold text-center mb-2 text-gray-600">
                Lower Deck
              </h2>
              <SeatGrid layout={layoutLower} isUpperDeck={false} />
            </div>
          )}
          {deck === 2 && layoutUpper.length > 0 && (
            <div>
              <h2 className="font-semibold text-center mb-2 text-gray-600">
                Upper Deck
              </h2>
              <SeatGrid layout={layoutUpper} isUpperDeck={true} />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <SeatTypeLegend />
        </div>
      </div>
    </div>
  );
}

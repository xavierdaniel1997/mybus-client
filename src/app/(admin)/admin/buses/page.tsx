"use client";

import { IBus } from "@/app/types/myBus";
import BusInfoModal from "@/components/bus/BusInfoModal";
import ReusableTable from "@/components/common/ReusableTable";
import { Dialog } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBus } from "react-icons/fa6";
import { MdDeleteOutline, MdEdit, MdMoreVert } from "react-icons/md";
import { HiSwitchHorizontal } from "react-icons/hi";

interface Row {
  [key: string]: React.ReactNode;
}

const columns = [
  { label: "Image", field: "image" },
  { label: "Name", field: "name" },
  { label: "Registration No", field: "registrationNo" },
  { label: "Type", field: "busType" },
  { label: "Brand", field: "brand" },
  { label: "Route", field: "route" },
  { label: "Layout", field: "layoutName" },
  { label: "Actions", field: "actions" },
];

export default function Buses() {
  const [buses, setBuses] = useState<IBus[]>();
  const router = useRouter();
  const [isBusInfoOpen, setIsBusInfoOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const openBusModal = (busId: string) => {
    setSelectedBusId(busId);
    setIsBusInfoOpen(true);
  };

  const getAllBuses = async (searchText?: string) => {
    try {
      const response = await api.get("/mybus/all-buses", {
        params: searchText ? { search: searchText } : {},
      });
      setBuses(response.data.buses || []);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    getAllBuses();
  }, []);

  const tableData: Row[] =
    buses?.map((bus) => ({
      image: (
        <Image
          src={bus.images?.[0] || "/no-image.png"}
          alt={bus.name}
          width={56}
          height={56}
          className="h-14 w-20 object-cover rounded-xs border"
        />
      ),
      name: bus.name,
      registrationNo: bus.registrationNo,
      busType: bus.busType,
      brand: bus.brand,
      route: bus.routes?.[0]?.routeName,
      layoutName: bus.layoutName,
      actions: (
        <div className="flex space-x-3">
          <MdEdit
            className="text-gray-500 cursor-pointer text-xl"
            // onClick={() => handleEditLocation(location.id)}
            aria-label={`Edit location ${bus.name}`}
          />
          <MdDeleteOutline
            className="text-gray-500 cursor-pointer text-xl"
            //  onClick={() => handleDeleteLocation(location._id)}
            aria-label={`Delete location ${bus.name}`}
          />
          <MdMoreVert
            className="text-gray-500 cursor-pointer text-xl"
            onClick={() => openBusModal(bus._id)}
          />
        </div>
      ),
    })) || [];

  return (
    <div className="px-20 py-3 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Buses</h1>
        </div>
        <div>
          <button
            className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2"
            onClick={() => router.push("/admin/busroute")}
          >
            <span>
              <FaBus />
            </span>
            Add Bus & Route
          </button>
        </div>
      </div>
      <div className="mt-3 w-full max-w-sm">
        <div className="flex items-center overflow-hidden rounded-md border border-gray-300 shadow-sm bg-white">
          <input
            type="text"
            placeholder="Search Bus"
            className="flex-1 px-3 py-2 outline-none text-sm italic"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white text-sm font-medium hover:bg-blue-600"
            onClick={() => getAllBuses(searchText)}
          >
            Search <FiSearch className="text-lg" />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <ReusableTable
          columns={columns}
          data={tableData}
          page={1}
          rowsPerPage={10}
          totalCount={tableData.length}
          onPageChange={() => {}}
          isPagination={false}
        />
      </div>
      <Dialog open={isBusInfoOpen} onOpenChange={setIsBusInfoOpen}>
        {selectedBusId && (
          <BusInfoModal
            busId={selectedBusId}
            close={() => setIsBusInfoOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}

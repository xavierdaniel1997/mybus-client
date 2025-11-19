"use client";

import { IBus } from "@/app/types/myBus";
import ReusableTable from "@/components/common/ReusableTable";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBus } from "react-icons/fa6";



interface Row {
  [key: string]: React.ReactNode;
}

const columns = [
  { label: "Image", field: "image" },
  { label: "Name", field: "name" },
  { label: "Registration No", field: "registrationNo" },
  { label: "Type", field: "busType" },
  { label: "Brand", field: "brand" },
  { label: "Actions", field: "actions" },
];

export default function Buses() {
  const [buses, setBuses] = useState<IBus[]>();
  const router = useRouter();

  const getAllBuses = async () => {
    try {
      const response = await api.get("/mybus/all-buses");
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
          className="h-14 w-20 object-cover rounded-md border"
        />
      ),
      name: bus.name,
      registrationNo: bus.registrationNo,
      busType: bus.busType,
      brand: bus.brand,
      actions: (
        <button
          className="text-blue-600 underline"
          onClick={() => router.push(`/admin/busroute/${bus._id}`)}
        >
          Edit
        </button>
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
      {/* <LocationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  onSuccess={() => fetchAllLocations(page)}/> */}
    </div>
  );
}

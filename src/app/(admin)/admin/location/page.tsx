"use client";

import { ILocation } from "@/app/types/locations";
import ReusableTable from "@/components/common/ReusableTable";
import LocationDialog from "@/components/dialogs/LocationDialog";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/utils/handleApiError";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEdit, MdOutlineAddLocation } from "react-icons/md";

  const columns = [
    { label: "Location Name", field: "name" },
    { label: "City", field: "city" },
    { label: "State", field: "state" },
    { label: "Station Code", field: "stationCode" },
    { label: "Latitude", field: "latitude" },
    { label: "Longitude", field: "longitude" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action" },
  ];

export default function Location() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 10;

  const fetchAllLocations = async (currentPage: number) => {
    try{
      const response = await api.get(`location/all-locations?page=${currentPage}&limit=${rowsPerPage}`)
      setLocations(response?.data?.data)
      setTotalCount(response.data.pagination.totalItems);
setTotalPages(response.data.pagination.totalPages);
    }catch(error){
      handleApiError(error)
    }
  }

  useEffect(() => {
    fetchAllLocations(page)
  }, [page])

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);
  };

  const handleDeleteLocation = async (locationId: string) => {
    try{
      const response = await api.delete(`/location/delete-location/${locationId}`)
      if(response.status === 200){
        fetchAllLocations(page)
      }
    }catch(error){
      handleApiError(error)
    }
  }


    const locationDetails = locations.map((location: ILocation) => ({
    name: (
      <div className="flex items-center gap-2">
        
        <Image
        src={location.locationImage || "/fallback-image.png"}
        alt={location.name}
        width={48}
        height={48}
        className="h-12 w-12 object-contain rounded"
      />
      <p>{location.name}</p>
      </div>
    ),  
    city: location.city,
    state: location.state,
    stationCode: location.stationCode,
    latitude: location.latitude,
    longitude: location.longitude,
    status: (
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${
          location.status
            ? "bg-green-600"
            : "bg-red-600"
        }`}></div>
      <div
        className={`text-center text-gray-600`}
      >
        {location.status ? "Active" : "Inactive"}
      </div>
      </div>
    ),
    action: (
      <div className="flex space-x-2">
        <MdEdit
          className="text-gray-500 cursor-pointer text-xl"
          // onClick={() => handleEditLocation(location.id)}
          aria-label={`Edit location ${location.name}`}
        />
        <MdDeleteOutline
          className="text-gray-500 cursor-pointer text-xl"
          onClick={() => handleDeleteLocation(location._id)}
          aria-label={`Delete location ${location.name}`}
        />
      </div>
    ),
  }));




  return (
    <div className="px-20 py-3 ">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">All Location</h1>
      </div>
      <div>
        <button className="flex items-center bg-blue-600 text-gray-50 px-4 py-1.5 rounded-md cursor-pointer gap-2" 
        onClick={() => setIsDialogOpen(true)}
        >
          <span>
            < MdOutlineAddLocation />
          </span>
          Location Details
        </button>
      </div>
    </div>
      <div className="mt-5">
        <ReusableTable
          columns={columns}
          data={locationDetails}  
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          isPagination={true}
        />
      </div>
      <LocationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  onSuccess={() => fetchAllLocations(page)}/>
    </div>
  );
}

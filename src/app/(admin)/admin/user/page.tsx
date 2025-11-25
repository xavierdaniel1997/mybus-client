"use client"
import { IUser } from "@/app/types/user";
import ReusableTable from "@/components/common/ReusableTable"
import { api } from "@/lib/api"
import { Phone } from "lucide-react";
import { useEffect, useState } from "react"
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { email } from "zod";

 const columns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action" },
  ];

export default function UserPage(){

    const [userInfos, setUserInfos] = useState<IUser[] | []>([])
     const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 10;

    useEffect(() => {
        const getAllUserInfo = async (currentPage: number) => {
            const response = await api.get(`/users/all-users?page=${currentPage}&limit=${rowsPerPage}`)
            setUserInfos(response.data.data)
        }
        getAllUserInfo(page)
    }, [page])

     const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);
  };

    console.log("users ...", userInfos)

    const userData = userInfos.map((user: IUser) => ({
      name: <p>{user.firstName} {user.lastName}</p>,
      email: user.email,
      phone: user.phone,
         status: (
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                user.isValidate
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}></div>
            <div
              className={`text-center text-gray-600`}
            >
              {user.isValidate ? "Active" : "Inactive"}
            </div>
            </div>
          ),
          action: (
            <div className="flex space-x-2">
              <MdEdit
                className="text-gray-500 cursor-pointer text-xl"
                // onClick={() => handleEditLocation(location.id)}
              />
              <MdDeleteOutline
                className="text-gray-500 cursor-pointer text-xl"
                // onClick={() => handleDeleteLocation(location._id)}
                // aria-label={`Delete location ${location.name}`}
              />
            </div>
          ),
    }))

    return(
         <div className="px-20 py-3 ">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">All Users</h1>
      </div>
    </div>
      <div className="mt-5">
        <ReusableTable
          columns={columns}
          data={userData}  
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          isPagination={true}
        />
      </div>
    </div>
    )
}
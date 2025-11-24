import ReusableTable from "@/components/common/ReusableTable"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"

export default function UserPage(){

    const [userInfos, setUserInfos] = useState()
     const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 10;

    useEffect(() => {
        const getAllUserInfo = async (currentPage: number) => {
            const response = await api.get(`/users/all-users?page=${currentPage}&limit=${rowsPerPage}`)
            setUserInfos(response.data.data.users)
        }
        getAllUserInfo(page)
    }, [page])


    return(
         <div className="px-20 py-3 ">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">All Users</h1>
      </div>
    </div>
      <div className="mt-5">
        {/* <ReusableTable
          columns={columns}
          data={locationDetails}  
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          isPagination={true}
        /> */}
      </div>
    </div>
    )
}
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils"; 

interface Column {
  label: React.ReactNode;
  field: string;
}

interface Row {
  [key: string]: React.ReactNode;
}

interface ReusableTableProps {
  columns: Column[];
  data: Row[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  isPagination: boolean;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  isPagination,
}) => {
  const totalPage = Math.ceil(totalCount / rowsPerPage);

  // Handle page change
  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      onPageChange(null, newPage);
    }
  };

  return (
    <div className="w-full">
      {/* Table Container */}
      <div className="border rounded-md shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="p-5 font-semibold text-gray-700 dark:text-gray-100"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="px-5 text-gray-700 dark:text-gray-300"
                    >
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {isPagination && totalPage > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            onClick={() => handlePageClick(page - 1)}
            disabled={page === 1}
            className={cn(
              "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md",
              "hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md",
                    page === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => handlePageClick(page + 1)}
            disabled={page === totalPage}
            className={cn(
              "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md",
              "hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
              page === totalPage ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
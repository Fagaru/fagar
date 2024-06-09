"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Corporation } from '@/types/corporation';

export const columns: ColumnDef<Corporation>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
  },
  {
    accessorKey: "address.cityId",
    header: "City",
  },
  {
    accessorKey: "address.regionId",
    header: "Region",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "isSuspended",
    header: "Suspended",
  },
  {
    accessorKey: "userId",
    header: "User",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]

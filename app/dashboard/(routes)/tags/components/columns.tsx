"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

import { Tag } from '@/types/tag';

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "label",
    header: "Label",
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

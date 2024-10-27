"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Booking } from '@/types/booking';

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "status",
    header: "Statut",
  },
  {
    accessorKey: "user",
    header: "Client",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "heure_debut",
    header: "Début",
  },
  {
    accessorKey: "heure_fin",
    header: "Fin",
  },
  {
    accessorKey: "comment",
    header: "Commentaires",
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]

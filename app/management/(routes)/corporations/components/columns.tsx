"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Corporation } from '@/types/corporation';

export const columns: ColumnDef<Corporation>[] = [
  {
    accessorKey: "name",
    header: "Libellé de l'entreprise",
  },
  {
    accessorKey: "category",
    header: "Catégorie",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "subscription",
    header: "Abonnement",
  },
  {
    accessorKey: "address.cityId",
    header: "Ville",
  },
  {
    accessorKey: "address.regionId",
    header: "Région",
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
    accessorKey: "user",
    header: "Utilisateur",
  },
  {
    accessorKey: "mail_pro",
    header: "Email pro",
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

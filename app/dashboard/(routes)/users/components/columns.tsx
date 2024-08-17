"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

import { User } from '@/types/user';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "Nom",
  },
  {
    accessorKey: "last_name",
    header: "Prénom",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "role",
    header: "Type de compte",
  },
  {
    accessorKey: "lastLogout",
    header: "Dernière connexion",
  },
  {
    accessorKey: "createdAt",
    header: "Membre depuis",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]

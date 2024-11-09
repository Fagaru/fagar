"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

import { User } from '@/types/user';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "last_name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "status",
    header: "Statut utilisateur",
  },
  {
    accessorKey: "isActive",
    header: "Statut compte",
  },
  {
    accessorKey: "isSuspended",
    header: "Accès au compte",
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

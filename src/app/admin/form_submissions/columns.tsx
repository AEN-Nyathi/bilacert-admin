"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Submission } from "@/lib/types"
import { format } from "date-fns"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import StatusUpdate from "./StatusUpdate"

export const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    pending: "secondary",
    'in-progress': "outline",
    completed: "default",
    rejected: "destructive",
    archived: "secondary"
}

interface ColumnsOptions {
    onDelete: (submission: Submission) => void;
}


export const columns = ({ onDelete }: ColumnsOptions): ColumnDef<Submission>[] => [
  {
    accessorKey: "formType",
    header: "Form Type",
  },
  {
    accessorKey: "serviceName",
    header: "Service Name",
  },
  {
    accessorKey: "fullName",
    header: "Client Name",
  },
  {
    accessorKey: "email",
    header: "Client Email",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Submitted At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        if (!date) return "N/A";
        const formattedDate = format(new Date(date), "PPpp");
        return <div className="font-medium">{formattedDate}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        return <StatusUpdate submission={row.original} />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const submission = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/admin/form_submissions/${submission.id}`}>View Details</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href={`/admin/form_submissions/${submission.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete(submission)}
            >
                Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

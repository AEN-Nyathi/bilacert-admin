"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Submission } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
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

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    pending: "default",
    'in-progress': "secondary",
    completed: "outline",
    rejected: "destructive",
    archived: "secondary"
}

export const columns: ColumnDef<Submission>[] = [
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
        const status = row.getValue("status") as string;
        return <Badge variant={statusVariantMap[status] || "default"}>{status}</Badge>
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(submission.id as string)}
            >
              Copy submission ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

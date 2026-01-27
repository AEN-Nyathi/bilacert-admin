
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Service } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ColumnsOptions {
    onEdit: (service: Service) => void;
    onDelete: (service: Service) => void;
    onViewDetails: (service: Service) => void;
}

export const columns = ({ onEdit, onDelete, onViewDetails }: ColumnsOptions): ColumnDef<Service>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => {
        const published = row.getValue("published") as boolean;
        return <Badge variant={published ? "default" : "secondary"}>{published ? "Published" : "Draft"}</Badge>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        if (!date) return "N/A";
        const formattedDate = format(new Date(date), "PP");
        return <div className="font-medium">{formattedDate}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original
 
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
            <DropdownMenuItem onClick={() => onViewDetails(service)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(service)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem 
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete(service)}
             >
                Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

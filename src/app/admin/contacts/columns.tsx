
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Contact } from "@/lib/types"
import { format } from "date-fns"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

interface ColumnsOptions {
    onEdit: (contact: Contact) => void;
    onDelete: (contact: Contact) => void;
}

export const columns = ({ onEdit, onDelete }: ColumnsOptions): ColumnDef<Contact>[] => [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.getValue("phone") || "N/A",
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => row.getValue("company") || "N/A",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
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
          const contact = row.original
     
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
                <DropdownMenuItem onClick={() => onEdit(contact)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem 
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => onDelete(contact)}
                 >
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]

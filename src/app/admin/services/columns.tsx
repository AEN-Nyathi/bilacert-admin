
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Service } from "@/lib/types"
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
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"

interface ColumnsOptions {
    onDelete: (service: Service) => void;
}

export const columns = ({ onDelete }: ColumnsOptions): ColumnDef<Service>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <Link href={`/admin/services/${row.original.id}`} className="font-medium text-primary hover:underline">
                    {row.original.title}
                </Link>
            )
        }
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
        accessorKey: "featured",
        header: "Featured",
        cell: ({ row }) => {
            const featured = row.getValue("featured") as boolean;
            return featured ? <Badge variant="outline">Yes</Badge> : 'No'
        }
    },
    {
        accessorKey: "pricing",
        header: "Pricing (ZAR)",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("pricing"))
            if (isNaN(amount)) return "N/A"
            const formatted = new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(amount)
       
            return <div className="font-medium">{formatted}</div>
        },
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
                <DropdownMenuItem asChild>
                    <Link href={`/admin/services/${service.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/services/${service.id}/edit`}>Edit</Link>
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

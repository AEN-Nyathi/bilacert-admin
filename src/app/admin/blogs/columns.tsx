
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BlogPost } from "@/lib/types"
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
    onEdit: (blog: BlogPost) => void;
    onDelete: (blog: BlogPost) => void;
    onViewDetails: (blog: BlogPost) => void;
}

export const columns = ({ onEdit, onDelete, onViewDetails }: ColumnsOptions): ColumnDef<BlogPost>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "author",
    header: "Author",
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
      const blog = row.original
 
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
            <DropdownMenuItem onClick={() => onViewDetails(blog)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(blog)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem 
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete(blog)}
             >
                Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

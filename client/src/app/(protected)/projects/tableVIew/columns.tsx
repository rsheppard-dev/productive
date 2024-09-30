"use client";

import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 100,
    cell: ({ row }) => <span className="capitalize">{row.original.title}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 130,
    cell: ({ row }) => {
      const status = row.original.status.replaceAll("_", " ");
      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    size: 75,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 130,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    size: 130,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    size: 130,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 150,
    cell: ({ row }) => row.original.author?.username,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    size: 150,
    cell: ({ row }) => row.original.assignee?.username,
  },
];

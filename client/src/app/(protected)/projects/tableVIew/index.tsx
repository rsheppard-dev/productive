"use client";

import Header from "@/components/header";
import { useGetTasksQuery } from "@/lib/features/tasks/tasksApiSlice";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  id: number;
};

export default function TableView({ id }: Props) {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching tasks.</div>;
  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header title="Table" isSmallText />
        <DataTable columns={columns} data={tasks ?? []} />
      </div>
    </div>
  );
}

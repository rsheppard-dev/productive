"use client";

import Header from "@/components/header";
import { useGetTasksQuery } from "@/lib/features/tasks/tasksApiSlice";
import TaskCard from "./taskCard";

type Props = {
  id: number;
};

export default function ListView({ id }: Props) {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching tasks.</div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header title="List" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}

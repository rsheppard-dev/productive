"use client";

import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/lib/features/tasks/tasksApiSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StatusEnum from "@/types/enums/status";
import TaskColumn from "@/app/(protected)/projects/boardView/taskColumn";

type Props = {
  id: number;
};
export default function BoardView({ id }: Props) {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  function moveTask(taskId: number, status: StatusEnum) {
    updateTaskStatus({ taskId, status });
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching tasks.</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {Object.values(StatusEnum).map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks ?? []}
            moveTask={moveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
}

import { useDrop } from "react-dnd";
import { EllipsisVertical, Plus } from "lucide-react";
import { Task as TaskType } from "@/types/task";
import StatusEnum from "@/types/enums/status";
import Task from "@/app/(protected)/projects/boardView/task";
import { Button } from "@/components/ui/button";

type Props = {
  status: StatusEnum;
  tasks: TaskType[];
  moveTask: (taskId: number, status: StatusEnum) => void;
};

export default function TaskColumn({ status, tasks, moveTask }: Props) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColour = {
    [StatusEnum.TO_DO]: "#2563EB",
    [StatusEnum.WORK_IN_PROGRESS]: "#059669",
    [StatusEnum.UNDER_REVIEW]: "#D97706",
    [StatusEnum.COMPLETED]: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColour[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColour[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-black">
          <h3 className="flex items-center text-lg font-semibold capitalize">
            {status.replaceAll("_", " ").toLowerCase()}
            <span className="ml-2 inline-block h-6 w-6 rounded-full bg-gray-200 p-1 text-center text-sm leading-none">
              {tasksCount}
            </span>
          </h3>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <EllipsisVertical size={26} />
            </Button>
            <Button variant="ghost" size="icon">
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
}

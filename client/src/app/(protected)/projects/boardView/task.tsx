import type { Task as TaskType } from "@/types/task";
import { useDrag } from "react-dnd";
import { format } from "date-fns";
import PriorityEnum from "@/types/enums/priority";
import Image from "next/image";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  task: TaskType;
};

export default function Task({ task }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagSplit = task.tags.split(",") || [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = task.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: PriorityEnum }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
        priority === PriorityEnum.URGENT
          ? "bg-red-200 text-red-700"
          : priority === PriorityEnum.HIGH
            ? "bg-text-700 bg-yellow-200"
            : priority === PriorityEnum.MEDIUM
              ? "bg-green-200 text-green-700"
              : priority === PriorityEnum.LOW
                ? "bg-blue-200 text-blue-700"
                : "bg gray-200 text-gray-700"
      }`}
    >
      {priority.toLocaleLowerCase().replaceAll("_", " ")}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-lg bg-white p-4 dark:bg-black dark:bg-opacity-10 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={task.attachments[0].fileUrl}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="round-t-md h-auto w-full"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-2 text-xs capitalize"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <EllipsisVertical size={26} />
          </Button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold capitalize">{task.title}</h4>

          {typeof task.points === "number" && (
            <div className="text-xs font-semibold">{task.points} pts</div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
          <p className="text-sm">{task.description}</p>
          <div className="mt-4 border-t border-gray-200">
            <div className="mt-3 flex items-center justify-between">
              <div className="flex -space-x-[6px] overflow-hidden">
                {task.assignee && (
                  <Avatar>
                    <AvatarImage
                      src={task.assignee.profilePictureUrl}
                      alt={task.assignee.username}
                    />
                    <AvatarFallback>
                      {task.assignee.username.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                {task.author && (
                  <Avatar>
                    <AvatarImage
                      src={task.author.profilePictureUrl}
                      alt={task.author.username}
                    />
                    <AvatarFallback>
                      {task.author.username.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex items-center">
                <MessageSquareMore size={20} />
                <span className="ml-1 text-sm">{numberOfComments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

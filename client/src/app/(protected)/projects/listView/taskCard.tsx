import { Task } from "@/types/task";
import Image from "next/image";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            <Image
              src={task.attachments[0].fileUrl}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="round-t-md"
            />
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong className="capitalize">Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task?.description ?? "No description provided."}
      </p>
      <p className="capitalize">
        <strong>Status:</strong>{" "}
        {task.status.toLocaleLowerCase().replace("_", " ")}
      </p>
      <p className="capitalize">
        <strong>Priority:</strong>{" "}
        {task.priority.toLocaleLowerCase().replace("_", " ")}
      </p>
      <p>
        <strong>Tags:</strong> {task?.tags ?? "No tags provided."}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task?.startDate
          ? new Date(task.startDate).toLocaleDateString()
          : "No start date provided."}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task?.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date provided."}
      </p>
      <p>
        <strong>Author:</strong> {task.author?.username ?? "Unknown."}
      </p>
      <p>
        <strong>Assignee:</strong> {task.assignee?.username ?? "Unassigned."}
      </p>
    </div>
  );
}

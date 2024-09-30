import type { Attachment } from "./attachment";
import PriorityEnum from "./enums/priority";
import StatusEnum from "./enums/status";
import type { User } from "./user";

export type Task = {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: StatusEnum;
  priority: PriorityEnum;
  startDate?: Date;
  dueDate?: Date;
  tags: string;
  points: number;
  assigneeId: number;
  authorId: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
};

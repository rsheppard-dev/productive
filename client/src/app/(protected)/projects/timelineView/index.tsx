"use client";

import { useGetTasksQuery } from "@/lib/features/tasks/tasksApiSlice";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import "gantt-task-react/dist/index.css";

type Props = {
  id: number;
};

type TaskTypeItem = "task" | "milestone" | "project";

export default function TimelineView({ id }: Props) {
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-GB",
  });

  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: id });

  const ganttTasks = useMemo(
    () =>
      tasks?.map((task) => ({
        start: new Date(task.startDate as unknown as string),
        end: new Date(task.dueDate as unknown as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItem,
        progress: task.points ? (task.points / 100) * 100 : 0,
        isDisabled: false,
      })) || [],
    [tasks],
  );

  function handleViewModeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching tasks.</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold">Project Tasks Timeline</h1>
        <div className="relative inline-block w-64">
          <Select>
            <SelectTrigger className="w-full" value={displayOptions.viewMode}>
              <SelectValue
                placeholder="Select view mode"
                onChange={handleViewModeChange}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ViewMode.Day}>Day</SelectItem>
              <SelectItem value={ViewMode.Week}>Week</SelectItem>
              <SelectItem value={ViewMode.Month}>Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="container overflow-hidden rounded-md shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor="hsl(24.6 95% 53.1%)"
            barBackgroundSelectedColor="darken(hsl(24.6 95% 53.1%), 10%)"
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <Button className="flex">Add New Task</Button>
        </div>
      </div>
    </div>
  );
}

import type { Request, Response } from 'express';
import {
	createTask,
	getTasks,
	updateTaskStatus,
} from '../services/task.services';
import type { InsertTaskSchema, StatusEnum } from '../db/schema/tasks.schema';

export async function getTasksHandler(
	req: Request<{}, {}, {}, { projectId: number }>,
	res: Response
) {
	try {
		const projectId = Number(req.query.projectId);

		const tasks = await getTasks(projectId);

		res.status(200).json(tasks);
	} catch (error: any) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Error retrieving tasks: ${error.message}` });
	}
}

export async function createTaskHandler(
	req: Request<{}, {}, InsertTaskSchema>,
	res: Response
) {
	try {
		const task = await createTask(req.body);

		res.status(201).json(task);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: `Error creating task: ${error.message}` });
	}
}

export async function updateTaskStatusHandler(
	req: Request<{ taskId: string }, {}, { status: StatusEnum }>,
	res: Response
) {
	try {
		const taskId = Number(req.params.taskId);
		const status = req.body.status;

		const updatedTask = await updateTaskStatus(taskId, status);

		res.status(200).json(updatedTask);
	} catch (error: any) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Error updating task status: ${error.message}` });
	}
}

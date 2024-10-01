import { eq } from 'drizzle-orm';
import db from '../db';
import { tasks } from '../db/schema';
import type { InsertTaskSchema, StatusEnum } from '../db/schema/tasks.schema';

export async function getTasks(projectId: number) {
	const data = await db.query.tasks.findMany({
		where: eq(tasks.projectId, projectId),
		with: {
			author: true,
			assignee: true,
			comments: true,
			attachments: true,
		},
	});

	return data;
}

export async function createTask(taskData: InsertTaskSchema) {
	const data = await db.insert(tasks).values(taskData).returning();

	return data;
}

export async function updateTaskStatus(taskId: number, taskStatus: StatusEnum) {
	const data = await db
		.update(tasks)
		.set({ status: taskStatus })
		.where(eq(tasks.id, taskId))
		.returning();

	return data;
}

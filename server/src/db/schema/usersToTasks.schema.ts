import { pgTable, primaryKey, serial } from 'drizzle-orm/pg-core';
import { tasks, users } from '../schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { relations } from 'drizzle-orm';

const usersToTasks = pgTable(
	'users_to_tasks',
	{
		userId: serial('user_id').references(() => users.id),
		taskId: serial('task_id').references(() => tasks.id),
	},
	t => ({
		pk: primaryKey({ columns: [t.userId, t.taskId] }),
	})
);

export const usersToTasksRelations = relations(usersToTasks, ({ one }) => ({
	user: one(users, {
		fields: [usersToTasks.userId],
		references: [users.id],
	}),
	task: one(tasks, {
		fields: [usersToTasks.taskId],
		references: [tasks.id],
	}),
}));

export default usersToTasks;

export const insertUsersToTasksSchema = createInsertSchema(usersToTasks);
export type InsertUsersToTasksSchema = z.infer<typeof insertUsersToTasksSchema>;
export const selectUsersToTasksSchema = createSelectSchema(usersToTasks);
export type SelectUsersToTasks = z.infer<typeof selectUsersToTasksSchema>;

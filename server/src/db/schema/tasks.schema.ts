import { relations } from 'drizzle-orm';
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import {
	attachments,
	comments,
	projects,
	users,
	usersToTasks,
} from '../schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const priorityEnum = pgEnum('priority', [
	'URGENT',
	'HIGH',
	'MEDIUM',
	'LOW',
	'BACKLOG',
]);

export type PriorityEnum = (typeof priorityEnum.enumValues)[number];

export const statusEnum = pgEnum('status', [
	'TO_DO',
	'WORK_IN_PROGRESS',
	'UNDER_REVIEW',
	'COMPLETED',
]);

export type StatusEnum = (typeof statusEnum.enumValues)[number];

const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	description: varchar('description'),
	status: statusEnum('status').notNull(),
	priority: priorityEnum('priority').notNull(),
	tags: varchar('tags').notNull(),
	startDate: timestamp('start_date', { mode: 'string' }).notNull(),
	dueDate: timestamp('due_date', { mode: 'string' }),
	points: integer('points'),
	projectId: serial('project_id').notNull(),
	authorUserId: serial('author_user_id').notNull(),
	assignedUserId: serial('assigned_user_id').notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id],
	}),
	author: one(users, {
		fields: [tasks.authorUserId],
		references: [users.id],
		relationName: 'author',
	}),
	assignee: one(users, {
		fields: [tasks.assignedUserId],
		references: [users.id],
		relationName: 'assignee',
	}),
	taskAssignments: many(usersToTasks),
	attachments: many(attachments),
	comments: many(comments),
}));

export default tasks;

export const insertTaskSchema = createInsertSchema(tasks);
export type InsertTaskSchema = z.infer<typeof insertTaskSchema>;
export const selectTaskSchema = createSelectSchema(tasks);
export type SelectTaskSchema = z.infer<typeof selectTaskSchema>;

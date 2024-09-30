import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { tasks, users } from '../schema';
import type { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	taskId: serial('task_id').references(() => tasks.id),
	userId: serial('author_id').references(() => users.id),
	text: varchar('text'),
});
export const commentsRelations = relations(comments, ({ one }) => ({
	task: one(tasks, {
		fields: [comments.taskId],
		references: [tasks.id],
	}),
	author: one(users, {
		fields: [comments.userId],
		references: [users.id],
	}),
}));

export default comments;

export const insertCommentSchema = createInsertSchema(comments);
export type InsertCommentSchema = z.infer<typeof insertCommentSchema>;
export const selectCommentSchema = createSelectSchema(comments);
export type SelectCommentSchema = z.infer<typeof selectCommentSchema>;

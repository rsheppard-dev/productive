import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { tasks, users } from '../schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const attachments = pgTable('attachments', {
	id: serial('id').primaryKey(),
	fileUrl: varchar('file_url'),
	fileName: varchar('file_name'),
	taskId: serial('task_id'),
	uploadedById: serial('uploaded_by_id'),
});

export const attachmentsRelations = relations(attachments, ({ one }) => ({
	task: one(tasks, {
		fields: [attachments.taskId],
		references: [tasks.id],
	}),
	uploadedBy: one(users, {
		fields: [attachments.uploadedById],
		references: [users.id],
	}),
}));

export default attachments;

export const insertAttachmentSchema = createInsertSchema(attachments);
export type InsertAttachmentSchema = z.infer<typeof insertAttachmentSchema>;
export const selectAttachmentSchema = createSelectSchema(attachments);
export type SelectAttachmentSchema = z.infer<typeof selectAttachmentSchema>;

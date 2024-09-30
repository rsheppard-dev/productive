import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { attachments, comments, tasks, teams, usersToTasks } from '../schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

const users = pgTable('users', {
	id: serial('id').primaryKey(),
	cognitoId: varchar('cognito_id').unique(),
	username: varchar('username').unique(),
	profilePictureUrl: varchar('profile_picture_url'),
	teamId: serial('team_id'),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	author: many(tasks, { relationName: 'author' }),
	assignee: many(tasks, { relationName: 'assignee' }),
	taskAssignments: many(usersToTasks),
	attachments: many(attachments),
	comments: many(comments),
	team: one(teams, {
		fields: [users.teamId],
		references: [teams.id],
	}),
}));

export default users;

export const insertUserSchema = createInsertSchema(users);
export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export const selectUserSchema = createSelectSchema(users);
export type SelectUserSchema = z.infer<typeof selectUserSchema>;

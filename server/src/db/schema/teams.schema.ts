import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { projectsToTeams, users } from '../schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

const teams = pgTable('teams', {
	id: serial('id').primaryKey(),
	name: varchar('name').unique(),
	logoUrl: varchar('logo_url'),
	productOwnerId: serial('product_owner_id'),
	projectManagerId: serial('project_manager_id'),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
	members: many(users),
	projects: many(projectsToTeams),
	productOwner: one(users, {
		fields: [teams.productOwnerId],
		references: [users.id],
	}),
	projectManager: one(users, {
		fields: [teams.projectManagerId],
		references: [users.id],
	}),
}));

export default teams;

export const insertTeamSchema = createInsertSchema(teams);
export type InsertTeamSchema = z.infer<typeof insertTeamSchema>;
export const selectTeamSchema = createSelectSchema(teams);
export type SelectTeamSchema = z.infer<typeof selectTeamSchema>;

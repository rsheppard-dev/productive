import { pgTable, primaryKey, serial } from 'drizzle-orm/pg-core';
import { projects, teams } from '../schema';
import type { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';

const projectsToTeams = pgTable(
	'projects_to_teams',
	{
		projectId: serial('project_id')
			.notNull()
			.references(() => projects.id),
		teamId: serial('team_id')
			.notNull()
			.references(() => teams.id),
	},
	t => ({
		pk: primaryKey({ columns: [t.projectId, t.teamId] }),
	})
);

export const projectsToTeamsRelations = relations(
	projectsToTeams,
	({ one }) => ({
		project: one(projects, {
			fields: [projectsToTeams.projectId],
			references: [projects.id],
		}),
		team: one(teams, {
			fields: [projectsToTeams.teamId],
			references: [teams.id],
		}),
	})
);

export default projectsToTeams;

export const insertProjectsToTeamsSchema = createInsertSchema(projectsToTeams);
export type InsertProjectsToTeamsSchema = z.infer<
	typeof insertProjectsToTeamsSchema
>;
export const selectProjectsToTeamsSchema = createSelectSchema(projectsToTeams);
export type SelectProjectsToTeams = z.infer<typeof selectProjectsToTeamsSchema>;

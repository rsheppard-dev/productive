import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { projectsToTeams, tasks } from '../schema';
import type { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	description: varchar('description'),
	startDate: timestamp('start_date', { mode: 'string' }).notNull(),
	endDate: timestamp('end_date', { mode: 'string' }),
});

export const projectsRelations = relations(projects, ({ many }) => ({
	teams: many(projectsToTeams),
	tasks: many(tasks),
}));

export default projects;

export const insertProjectSchema = createInsertSchema(projects);
export type InsertProjectSchema = z.infer<typeof insertProjectSchema>;
export const selectProjectSchema = createSelectSchema(projects);
export type SelectProjectSchema = z.infer<typeof selectProjectSchema>;

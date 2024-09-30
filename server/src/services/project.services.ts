import db from '../db';
import { projects } from '../db/schema';
import type { InsertProjectSchema } from '../db/schema/projects.schema';

export async function getProjects() {
	const projects = await db.query.projects.findMany();
	return projects;
}

export async function createProject(data: InsertProjectSchema) {
	const project = await db.insert(projects).values(data).returning();
	return project;
}

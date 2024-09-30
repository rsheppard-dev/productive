import type { Request, Response } from 'express';
import { createProject, getProjects } from '../services/project.services';
import type { InsertProjectSchema } from '../db/schema/projects.schema';

export async function getProjectsHandler(req: Request, res: Response) {
	try {
		const projects = await getProjects();
		res.json(projects);
	} catch (error: any) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Error retrieving projects: ${error.message}` });
	}
}

export async function createProjectHandler(
	req: Request<{}, {}, InsertProjectSchema>,
	res: Response
) {
	try {
		const project = await createProject(req.body);
		res.json(project);
	} catch (error: any) {
		console.error(error);
		res
			.status(500)
			.json({ message: `Error creating project: ${error.message}` });
	}
}

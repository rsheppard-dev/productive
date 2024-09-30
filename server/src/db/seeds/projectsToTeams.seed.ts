import { faker } from '@faker-js/faker';
import db, { type Db } from '..';
import type { InsertProjectsToTeamsSchema } from '../schema/projectsToTeams.schema';
import { projectsToTeams } from '../schema';

const mock = async () => {
	const [projectsData, teamsData] = await Promise.all([
		db.query.projects.findMany(),
		db.query.teams.findMany(),
	]);

	const data: InsertProjectsToTeamsSchema[] = [];
	const uniquePairs = new Set<string>();

	while (data.length < 10) {
		const projectId = faker.helpers.arrayElement(projectsData).id;
		const teamId = faker.helpers.arrayElement(teamsData).id;
		const pair = `${projectId}-${teamId}`;

		if (!uniquePairs.has(pair)) {
			uniquePairs.add(pair);
			data.push({ projectId, teamId });
		}
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(projectsToTeams).values(data);
};

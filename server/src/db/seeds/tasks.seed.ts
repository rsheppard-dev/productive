import type { InsertTaskSchema } from '../schema/tasks.schema';
import { priorityEnum, statusEnum, tasks } from '../schema';
import type { Db } from '..';
import { faker } from '@faker-js/faker';
import db from '..';

const mock = async () => {
	const [usersData, projectsData] = await Promise.all([
		db.query.users.findMany(),
		db.query.projects.findMany(),
	]);

	const data: InsertTaskSchema[] = [];

	for (let i = 0; i < 100; i++) {
		data.push({
			title: faker.lorem.words(3),
			description: faker.lorem.words(10),
			status: faker.helpers.arrayElement(statusEnum.enumValues),
			tags: faker.helpers.arrayElement([
				'frontend',
				'backend',
				'design',
				'testing',
			]),
			priority: faker.helpers.arrayElement(priorityEnum.enumValues),
			startDate: faker.date.past().toISOString(),
			dueDate: faker.date.future().toISOString(),
			projectId: faker.helpers.arrayElement(projectsData).id,
			authorUserId: faker.helpers.arrayElement(usersData).id,
			assignedUserId: faker.helpers.arrayElement(usersData).id,
		});
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(tasks).values(data);
};

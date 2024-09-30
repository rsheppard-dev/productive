import { faker } from '@faker-js/faker';
import db, { type Db } from '..';
import type { InsertUsersToTasksSchema } from '../schema/usersToTasks.schema';
import { usersToTasks } from '../schema';

const mock = async () => {
	const [tasksData, usersData] = await Promise.all([
		db.query.tasks.findMany(),
		db.query.users.findMany(),
	]);

	const data: InsertUsersToTasksSchema[] = [];
	const uniquePairs = new Set<string>();

	while (data.length < 50) {
		const userId = faker.helpers.arrayElement(usersData).id;
		const taskId = faker.helpers.arrayElement(tasksData).id;
		const pair = `${userId}-${taskId}`;

		if (!uniquePairs.has(pair)) {
			uniquePairs.add(pair);
			data.push({ userId, taskId });
		}
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(usersToTasks).values(data);
};

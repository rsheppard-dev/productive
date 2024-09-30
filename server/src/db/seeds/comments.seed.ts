import { faker } from '@faker-js/faker';
import db, { type Db } from '..';
import type { InsertCommentSchema } from '../schema/comments.schema';
import { comments } from '../schema';

const mock = async () => {
	const [tasksData, usersData] = await Promise.all([
		db.query.tasks.findMany(),
		db.query.users.findMany(),
	]);

	const data: InsertCommentSchema[] = [];

	for (let i = 0; i < 60; i++) {
		data.push({
			text: faker.lorem.words(15),
			taskId: faker.helpers.arrayElement(tasksData).id,
			userId: faker.helpers.arrayElement(usersData).id,
		});
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(comments).values(data);
};

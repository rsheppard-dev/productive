import { faker } from '@faker-js/faker';
import db, { type Db } from '..';
import type { InsertAttachmentSchema } from '../schema/attachments.schema';
import { attachments } from '../schema';

const mock = async () => {
	const [tasksData, usersData] = await Promise.all([
		db.query.tasks.findMany(),
		db.query.users.findMany(),
	]);

	const data: InsertAttachmentSchema[] = [];

	for (let i = 0; i < 50; i++) {
		data.push({
			fileUrl: faker.image.url(),
			fileName: faker.system.fileName(),
			taskId: faker.helpers.arrayElement(tasksData).id,
			uploadedById: faker.helpers.arrayElement(usersData).id,
		});
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(attachments).values(data);
};

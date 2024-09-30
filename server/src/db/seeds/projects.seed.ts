import type { Db } from '..';
import type { InsertProjectSchema } from '../schema/projects.schema';
import { faker } from '@faker-js/faker';
import { projects } from '../schema';

const mock = () => {
	const data: InsertProjectSchema[] = [];

	for (let i = 0; i < 10; i++) {
		data.push({
			name: faker.lorem.words(3),
			description: faker.lorem.words(10),
			startDate: faker.date.past().toISOString(),
			endDate: faker.date.future().toISOString(),
		});
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = mock();
	await db.insert(projects).values(data);
};

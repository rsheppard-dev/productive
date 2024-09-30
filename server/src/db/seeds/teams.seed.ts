import { faker } from '@faker-js/faker';
import db, { type Db } from '..';
import type { InsertTeamSchema } from '../schema/teams.schema';
import teams from '../schema/teams.schema';

const mock = async () => {
	const usersData = await db.query.users.findMany();

	const data: InsertTeamSchema[] = [];

	for (let i = 0; i < 4; i++) {
		data.push({
			name: faker.company.buzzAdjective(),
			logoUrl: faker.image.dataUri({
				width: 300,
				height: 300,
				type: 'svg-uri',
			}),
			productOwnerId: faker.helpers.arrayElement(usersData).id,
			projectManagerId: faker.helpers.arrayElement(usersData).id,
		});
	}

	return data;
};

export const seed = async (db: Db) => {
	const data = await mock();
	await db.insert(teams).values(data);
};

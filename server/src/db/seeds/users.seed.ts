import type { Db } from '..';
import type { InsertUserSchema } from '../schema/users.schema';
import { users } from '../schema';
import { faker } from '@faker-js/faker';

const mock: InsertUserSchema[] = [
	{
		username: 'AliceJones',
		teamId: 1,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174001',
	},
	{
		username: 'BobSmith',
		teamId: 2,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174002',
	},
	{
		username: 'CarolWhite',
		teamId: 3,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174003',
	},
	{
		username: 'DaveBrown',
		teamId: 4,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '213b7530-1031-70e0-67e9-fe0805e18fb3',
	},
	{
		username: 'EveClark',
		teamId: 5,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174005',
	},
	{
		username: 'FrankWright',
		teamId: 1,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174006',
	},
	{
		username: 'GraceHall',
		teamId: 2,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174007',
	},
	{
		username: 'HenryAllen',
		teamId: 3,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174008',
	},
	{
		username: 'IdaMartin',
		teamId: 4,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174009',
	},
	{
		username: 'JohnDoe',
		teamId: 5,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174010',
	},
	{
		username: 'LauraAdams',
		teamId: 1,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174011',
	},
	{
		username: 'NormanBates',
		teamId: 2,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174012',
	},
	{
		username: 'OliviaPace',
		teamId: 3,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174013',
	},
	{
		username: 'PeterQuill',
		teamId: 4,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174014',
	},
	{
		username: 'QuincyAdams',
		teamId: 5,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174015',
	},
	{
		username: 'RachelGreen',
		teamId: 1,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174016',
	},
	{
		username: 'SteveJobs',
		teamId: 2,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174017',
	},
	{
		username: 'TinaFey',
		teamId: 3,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174018',
	},
	{
		username: 'UrsulaMonroe',
		teamId: 4,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174019',
	},
	{
		username: 'VictorHugo',
		teamId: 5,
		profilePictureUrl: faker.image.avatar(),
		cognitoId: '123e4567-e89b-12d3-a456-426614174020',
	},
];

export async function seed(db: Db) {
	await db.insert(users).values(mock);
}

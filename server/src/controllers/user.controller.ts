import { faker } from '@faker-js/faker';
import type { Request, Response } from 'express';
import { createUser, getUsers } from '../services/user.services';
import type { InsertUserSchema } from '../db/schema/users.schema';

export async function createUserHandler(
	req: Request<{}, {}, InsertUserSchema>,
	res: Response
) {
	try {
		const {
			username,
			cognitoId,
			profilePictureUrl = faker.image.avatar(),
			teamId = 1,
		} = req.body;

		const newUser = await createUser({
			username,
			cognitoId,
			profilePictureUrl,
			teamId,
		});

		res
			.status(201)
			.json({ message: 'New user created successfully!', user: newUser });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: `Error creating user: ${error.message}` });
	}
}

export async function getUsersHandler(req: Request, res: Response) {
	try {
		const users = await getUsers();

		res.status(200).json({ users });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: `Error fetching users: ${error.message}` });
	}
}

import db from '../db';
import type { InsertUserSchema } from '../db/schema/users.schema';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createUser(user: InsertUserSchema) {
	const data = await db.insert(users).values(user).returning();

	return data;
}

export async function getUsers() {
	const data = await db.query.users.findMany();

	return data;
}

export async function getUser(cognitoId: string) {
	const data = await db.query.users.findFirst({
		where: eq(users.cognitoId, cognitoId),
	});

	return data;
}

import { sql, Table } from 'drizzle-orm';
import type { Db } from '.';
import * as schema from './schema';
import * as seeds from './seeds';
import db from '.';

async function resetTable(db: Db, table: Table) {
	return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
	for (const table of [
		schema.users,
		schema.projects,
		schema.teams,
		schema.tasks,
		schema.comments,
		schema.attachments,
		schema.projectsToTeams,
		schema.usersToTasks,
	]) {
		await resetTable(db, table);
	}

	await seeds.users(db);
	await seeds.projects(db);
	await seeds.teams(db);
	await seeds.tasks(db);
	await seeds.comments(db);
	await seeds.attachments(db);
	await seeds.projectsToTeams(db);
	await seeds.usersToTasks(db);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log('Seeding complete!');
		process.exit(0);
	});

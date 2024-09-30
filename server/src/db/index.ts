import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import env from '../config/env';
import * as schema from './schema';

const { Pool } = pg;

const pool = new Pool({
	host: env.DB_HOST,
	port: env.DB_PORT,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = drizzle(pool, { schema });

export default db;

export type Db = typeof db;

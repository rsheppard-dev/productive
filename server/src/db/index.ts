import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import env from '../config/env';
import * as schema from './schema';

const { Pool } = pg;

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = drizzle(pool, { schema });

export default db;

export type Db = typeof db;

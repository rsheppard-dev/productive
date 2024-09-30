import { defineConfig } from 'drizzle-kit';
import env from './src/config/env';

export default defineConfig({
	schema: './src/db/schema',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
		ssl: {
			rejectUnauthorized: env.NODE_ENV === 'production',
		},
	},
	verbose: true,
	strict: true,
});

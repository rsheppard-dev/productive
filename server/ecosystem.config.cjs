module.exports = {
	apps: [
		{
			name: 'productive',
			script: 'pnpm',
			args: 'run dev',
			env: {
				NODE_ENV: 'development',
			},
		},
	],
};

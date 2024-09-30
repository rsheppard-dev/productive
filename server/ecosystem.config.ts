module.exports = {
	apps: [
		{
			name: 'projective',
			script: 'pnpm',
			args: 'run dev',
			env: {
				NODE_ENV: 'development',
			},
		},
	],
};

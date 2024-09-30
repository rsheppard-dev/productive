module.exports = {
	apps: [
		{
			name: 'projective',
			script: 'npm',
			args: 'run dev',
			env: {
				NODE_ENV: 'development',
			},
		},
	],
};

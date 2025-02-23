import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: './',
	testMatch: ['**/tests/**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	moduleNameMapper: {
		'^@config/(.*)$': '<rootDir>/src/config/$1',
		'^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
		'^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
		'^@models/(.*)$': '<rootDir>/src/models/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
		'^@server$': '<rootDir>/src/server.ts',
	},
	setupFiles: ['dotenv/config'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;

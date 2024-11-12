'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const user_1 = __importDefault(require('@models/user'));
const _server_1 = require('@server');
const mongoose_1 = __importDefault(require('mongoose'));
const supertest_1 = __importDefault(require('supertest'));
let server;
describe('User Controller', () => {
	beforeAll(async () => {
		server = await (0, _server_1.startServer)();
		await mongoose_1.default.connect(process.env.MONGO_URI);
	});
	afterAll(async () => {
		await user_1.default.deleteOne({ email: 'testuser@example.com' });
		await mongoose_1.default.connection.close();
		if (server) await server.close();
	});
	it('should register a user with credentials', async () => {
		const response = await (0, supertest_1.default)(_server_1.app)
			.post('/api/v1/register')
			.send({ email: 'testuser@example.com', password: 'password' });
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('user');
		expect(response.body).toHaveProperty('token');
	});
	it('should return error if user already exists', async () => {
		const response = await (0, supertest_1.default)(_server_1.app)
			.post('/api/v1/register')
			.send({ email: 'testuser@example.com', password: 'password' });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message');
	});
	it('should log in a user with correct credentials', async () => {
		const response = await (0, supertest_1.default)(_server_1.app)
			.post('/api/v1/login')
			.send({ email: 'testuser@example.com', password: 'password' });
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('user');
		expect(response.body).toHaveProperty('token');
	});
	it('should return 401 for invalid login', async () => {
		const response = await (0, supertest_1.default)(_server_1.app)
			.post('/api/v1/login')
			.send({ email: 'invalidUser@example.com', password: 'wrongPassword' });
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message');
	});
});

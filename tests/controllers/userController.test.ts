import mongoose from 'mongoose';
import request from 'supertest';

import User from '../../src/models/user';
import { app, startServer } from '../../src/server';

let server;

describe('User Controller', () => {
	beforeAll(async () => {
		server = await startServer();
		await mongoose.connect(process.env.MONGO_URI as string);
	});

	afterAll(async () => {
		await User.deleteOne({ email: 'testuser@example.com' });

		await mongoose.connection.close();
		server.close();
	});

	it('should register a user with credentials', async () => {
		const response = await request(app)
			.post('/api/v1/register')
			.send({ email: 'testuser@example.com', password: 'password' });

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('user');
		expect(response.body).toHaveProperty('token');
	});

	it('should return error if user already exists', async () => {
		const response = await request(app)
			.post('/api/v1/register')
			.send({ email: 'testuser@example.com', password: 'password' });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('message');
	});

	it('should log in a user with correct credentials', async () => {
		const response = await request(app)
			.post('/api/v1/login')
			.send({ email: 'testuser@example.com', password: 'password' });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message');
		expect(response.body).toHaveProperty('user');
		expect(response.body).toHaveProperty('token');
	});

	it('should return 401 for invalid login', async () => {
		const response = await request(app)
			.post('/api/v1/login')
			.send({ email: 'invalidUser@example.com', password: 'wrongPassword' });

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message');
	});
});

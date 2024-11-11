import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as userService from '../services/userService';

export const registerUser: RequestHandler = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await userService.findUserByEmail(email);
		if (existingUser) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message: 'User with this email already exists',
			});

			return;
		}

		const user = await userService.createUser(email, password);
		const token = userService.generateToken(user);

		res.status(201).json({ message: 'User registered successfully', user, token });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const loginUser: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await userService.authenticateUser(email, password);

		if (!user) {
			res.status(401).json({ message: 'Invalid credentials' });

			return;
		}

		const token = userService.generateToken(user);
		res.json({ message: 'User logged in successfully', user, token });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

import config from '@config/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, config.jwtSecret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

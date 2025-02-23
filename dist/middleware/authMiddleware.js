'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.authenticateJWT = void 0;
const config_1 = __importDefault(require('@config/config'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const authenticateJWT = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.sendStatus(401);
	jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
exports.authenticateJWT = authenticateJWT;

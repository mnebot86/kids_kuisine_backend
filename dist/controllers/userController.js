'use strict';
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
			});
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v });
			}
		: function (o, v) {
				o['default'] = v;
			});
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);

		return result;
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require('../services/userService'));
const registerUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await userService.findUserByEmail(email);
		if (existingUser) {
			res.status(400).json({ message: 'User with this email already exists' });

			return;
		}
		const user = await userService.createUser(email, password);
		const token = userService.generateToken(user);
		res.status(201).json({ message: 'User registered successfully', user, token });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
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
exports.loginUser = loginUser;

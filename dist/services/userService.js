'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateToken =
	exports.authenticateUser =
	exports.createUser =
	exports.findUserByEmail =
		void 0;
const user_1 = __importDefault(require('@models/user'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const findUserByEmail = async email => user_1.default.findOne({ email });
exports.findUserByEmail = findUserByEmail;
const createUser = async (email, password) => {
	const hashedPassword = await bcrypt_1.default.hash(password, 10);
	const newUser = new user_1.default({ email, password: hashedPassword });

	return newUser.save();
};
exports.createUser = createUser;
const authenticateUser = async (email, password) => {
	const user = await (0, exports.findUserByEmail)(email);
	if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
		return null;
	}

	return user;
};
exports.authenticateUser = authenticateUser;
const generateToken = user => {
	const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});

	return token;
};
exports.generateToken = generateToken;

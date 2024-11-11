import User, { IUser } from '@models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const findUserByEmail = async (email: string) => User.findOne({ email });

export const createUser = async (email: string, password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new User({ email, password: hashedPassword });

	return newUser.save();
};

export const authenticateUser = async (email: string, password: string) => {
	const user = await findUserByEmail(email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return null;
	}

	return user;
};

export const generateToken = (user: IUser) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

	return token;
};

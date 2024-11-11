import dotenv from 'dotenv';

dotenv.config();

const config = {
	mongoURI: process.env.MONGO_URI,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
};

export default config;

import config from '@config/config';
import connectDB from '@config/db';
import passport from '@config/passport';
import errorHandler from '@middleware/errorHandler';
import userRoutes from '@routes/userRoutes';
import express from 'express';
import 'module-alias/register';

const app = express();
let server: any;
let isServerRunning = false;

app.use(express.json());
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

app.use('/api/v1', userRoutes);
app.use(errorHandler);

const startServer = async () => {
	if (isServerRunning) {
		console.log('Server is already running.');

		return server;
	}

	await connectDB();
	server = app.listen(config.port, () => {
		isServerRunning = true;
		console.log(`Server running on port ${config.port}`);
	});

	return server;
};

if (process.env.NODE_ENV !== 'test') {
	startServer();
}

export { app, startServer };

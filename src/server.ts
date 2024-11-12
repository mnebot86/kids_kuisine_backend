import config from '@config/config';
import connectDB from '@config/db';
import passport from '@config/passport';
import errorHandler from '@middleware/errorHandler';
import userRoutes from '@routes/userRoutes';
import express from 'express';

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

app.use('/api/v1', userRoutes);
app.use(errorHandler);

const startServer = async () => {
	await connectDB();
	const server = app.listen(config.port, () => {
		console.log(`Server running on port ${config.port}`);
	});

	return server;
};

startServer();

export { app, startServer };

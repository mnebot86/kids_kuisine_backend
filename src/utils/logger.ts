import path from 'path';
import winston from 'winston';

import 'winston-daily-rotate-file';

const logDir = path.join(__dirname, '..', 'logs');

const logger = winston.createLogger({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [
		new winston.transports.Console(),
		new winston.transports.DailyRotateFile({
			filename: path.join(logDir, 'combined-%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			maxFiles: '30d',
		}),
		new winston.transports.DailyRotateFile({
			filename: path.join(logDir, 'error-%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			level: 'error',
			maxFiles: '30d',
		}),
	],
});

export default logger;

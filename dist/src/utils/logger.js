'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const winston_1 = __importDefault(require('winston'));
require('winston-daily-rotate-file');
const logDir = path_1.default.join(__dirname, '..', 'logs');
const logger = winston_1.default.createLogger({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: winston_1.default.format.combine(
		winston_1.default.format.timestamp(),
		winston_1.default.format.json(),
	),
	transports: [
		new winston_1.default.transports.Console(),
		new winston_1.default.transports.DailyRotateFile({
			filename: path_1.default.join(logDir, 'combined-%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			maxFiles: '30d',
		}),
		new winston_1.default.transports.DailyRotateFile({
			filename: path_1.default.join(logDir, 'error-%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			level: 'error',
			maxFiles: '30d',
		}),
	],
});
exports.default = logger;

'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const logger_1 = __importDefault(require('@utils/logger'));
const config_1 = __importDefault(require('@config/config'));
const connectDB = async () => {
	try {
		await mongoose_1.default.connect(config_1.default.mongoURI);
		logger_1.default.info(`MongoDB Connected: ${config_1.default.mongoURI}`);
	} catch (error) {
		logger_1.default.error(`Error: ${error}`);
		process.exit(1);
	}
};
exports.default = connectDB;

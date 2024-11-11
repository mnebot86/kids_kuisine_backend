'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require('express'));
const db_1 = __importDefault(require('@config/db'));
const config_1 = __importDefault(require('@config/config'));
const userRoutes_1 = __importDefault(require('@routes/userRoutes'));
const passport_1 = __importDefault(require('@config/passport'));
const errorHandler_1 = __importDefault(require('@middleware/errorHandler'));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/api/v1/users', userRoutes_1.default);
app.use(errorHandler_1.default);
const startServer = async () => {
	await (0, db_1.default)();
	const server = app.listen(config_1.default.port, () => {
		console.log(`Server running on port ${config_1.default.port}`);
	});

	return server;
};
exports.startServer = startServer;

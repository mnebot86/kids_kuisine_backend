"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("@controllers/userController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
exports.default = router;

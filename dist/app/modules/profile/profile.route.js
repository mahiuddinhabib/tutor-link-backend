"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const profile_controller_1 = require("./profile.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const profile_validation_1 = require("./profile.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.CUSTOMER, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.TUTOR), profile_controller_1.ProfileController.getProfile);
router.patch('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN, user_1.USER_ROLE.CUSTOMER, user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.TUTOR), (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.updateProfileZodSchema), profile_controller_1.ProfileController.updateProfile);
exports.ProfileRoutes = router;

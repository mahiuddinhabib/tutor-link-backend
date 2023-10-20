"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const availableService_validation_1 = require("./availableService.validation");
const availableService_controller_1 = require("./availableService.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-available-service', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(availableService_validation_1.AvailableServiceValidation.createAvailableServiceZodSchema), availableService_controller_1.AvailableServiceController.createAvailableService);
router.get('/', availableService_controller_1.AvailableServiceController.getAllAvailableServices);
router.get('/:id', availableService_controller_1.AvailableServiceController.getSingleAvailableService);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(availableService_validation_1.AvailableServiceValidation.updateAvailableServiceZodSchema), availableService_controller_1.AvailableServiceController.updateAvailableService);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), availableService_controller_1.AvailableServiceController.deleteAvailableService);
exports.AvailableServiceRoutes = router;

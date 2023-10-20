"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_validation_1 = require("./feedback.validation");
const feedback_controller_1 = require("./feedback.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-feedback', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.createFeedbackZodSchema), feedback_controller_1.FeedbackController.createFeedback);
router.get('/', feedback_controller_1.FeedbackController.getAllFeedbacks);
router.get('/:id', feedback_controller_1.FeedbackController.getSingleFeedback);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.updateFeedbackZodSchema), feedback_controller_1.FeedbackController.updateFeedback);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), feedback_controller_1.FeedbackController.deleteFeedback);
exports.FeedbackRoutes = router;

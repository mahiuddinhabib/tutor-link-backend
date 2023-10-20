"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_validation_1 = require("./faq.validation");
const faq_controller_1 = require("./faq.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-faq', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FAQValidation.createFAQZodSchema), faq_controller_1.FAQController.createFAQ);
router.get('/', faq_controller_1.FAQController.getAllFAQs);
router.get('/:id', faq_controller_1.FAQController.getSingleFAQ);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(faq_validation_1.FAQValidation.updateFAQZodSchema), faq_controller_1.FAQController.updateFAQ);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), faq_controller_1.FAQController.deleteFAQ);
exports.FAQRoutes = router;

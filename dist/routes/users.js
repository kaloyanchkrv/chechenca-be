"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post("/", users_1.userController.createUser);
router.post("/guard", users_1.userController.createGuard);
router.get("/:id", users_1.userController.getUser);
router.get("/guard/:id", users_1.userController.getGuard);
router.get("/guard/?skills", users_1.userController.getGuardBySkills);
exports.userRoute = router;
//# sourceMappingURL=users.js.map
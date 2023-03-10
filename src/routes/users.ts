import { Router } from "express";
import { userController } from "../controllers/users";

const router = Router();

router.post("/", userController.createUser);
router.post("/guard", userController.createGuard);
router.get("/guard", userController.getGuardBySkills);
router.get("/all", userController.getAllUsers);
router.get("/all-guard", userController.getAllGuards);
router.get("/:id", userController.getUser);
router.get("/guard/:id", userController.getGuard);

export const userRoute = router;

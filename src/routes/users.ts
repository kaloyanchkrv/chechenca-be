import { Router } from "express";
import { userController } from "../controllers/users";

const router = Router();

router.post("/", userController.createUser);
router.post("/guard", userController.createGuard);
router.get("/:id", userController.getUser);
router.get("/guard/:id", userController.getGuard);
//router.get("/guard", userController.getGuardBySkills);

export const userRoute = router;

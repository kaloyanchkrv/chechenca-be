import { Router } from "express";
import { userRoute } from "./users";

const router = Router();

router.use("/users", userRoute);

export default router;

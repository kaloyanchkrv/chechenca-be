import { Router } from "express";
import { requestRoute } from "./requests";
import { userRoute } from "./users";

const router = Router();

router.use("/users", userRoute);
router.use("/requests", requestRoute);

export default router;

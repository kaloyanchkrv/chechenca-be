import { Router } from "express";
import { requestController } from "../controllers/requests";

const router = Router();

router.post("/", requestController.createRequest);
router.get("/:id", requestController.getRequestById);
router.get("/users/:userId", requestController.getRequestsByUserId);
router.get("/", requestController.getAllRequests);

export const requestRoute = router;

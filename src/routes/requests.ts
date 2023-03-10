import { Router } from "express";
import { requestController } from "../controllers/requests";

const router = Router();

router.post("/", requestController.createRequest);
router.get("/active", requestController.getActiveRequests);
router.get("/:id", requestController.getRequestById);
router.get("/users/:userId", requestController.getRequestsByUserId);
router.get("/", requestController.getAllRequests);
router.patch("/:id/guard/:guardId", requestController.updateRequestToTaken);
router.patch("/:id/active", requestController.updateRequestToActive);

export const requestRoute = router;

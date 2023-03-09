import { Router } from "express";
import { requestController } from "../controllers/requests";

const router = Router();

router.post("/", requestController.createRequest);

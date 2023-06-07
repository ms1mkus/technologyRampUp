import { Router } from "express";
import {
  getDaysController,
  getDayByDateController,
  createDayController,
} from "../controllers/dayController";

const dayRouter = Router();

dayRouter.get("/", getDaysController);
dayRouter.get("/byday", getDayByDateController);
dayRouter.post("/", createDayController);

export default dayRouter;

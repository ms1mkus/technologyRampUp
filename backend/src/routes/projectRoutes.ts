import { Router } from "express";
import {
  getProjectsController,
  getProjectByIdController,
  createProjectController,
} from "../controllers/projectController";

const projectRouter = Router();

projectRouter.get("/", getProjectsController);
projectRouter.get("/:id", getProjectByIdController);
projectRouter.post("/", createProjectController);

export default projectRouter;

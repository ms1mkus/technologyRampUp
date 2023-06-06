import { Request, Response, NextFunction, Router } from "express";
import pg from "../knexfile";

const projectRouter = Router();

projectRouter.post("/", projectRouteHandler);
projectRouter.get("/", getProjectsRouteHandler);

async function projectRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("req.body:", req.body); // Debug statement
    if (!req.body.projectName) {
      throw new Error("Project name doesn't exist");
    }
    if (req.body.projectName.length < 3) {
      throw new Error("Project name must exceed 3 characters");
    }

    const response = await pg("project")
      .insert({ project_name: req.body.projectName })
      .returning("*");
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getProjectsRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await pg.select().table("project");
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export default projectRouter;

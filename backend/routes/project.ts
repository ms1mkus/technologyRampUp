import { Request, Response, NextFunction, Router } from "express";
import pg from "../knexfile";
import { Project, RequestBody } from "../types/types";

const projectRouter = Router();

projectRouter.post("/", projectRouteHandler);
projectRouter.get("/", getProjectsRouteHandler);

async function projectRouteHandler(
  req: RequestBody<Project>,
  res: Response,
  next: NextFunction
) {
  try {
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

export async function getProjectById(id: string): Promise<Project | null> {
  const response = await pg.from("project").select().where({ id: id }).first();
  return response || null;
}

export default projectRouter;

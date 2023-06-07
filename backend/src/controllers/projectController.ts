import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/ProjectService";

const projectService = new ProjectService();

export async function getProjectsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await projectService.getProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

export async function getProjectByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.params.id;
    if (parseInt(projectId)) {
      const project = await projectService.getProjectById(parseInt(projectId));
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } else {
      throw new Error("Invalid project id");
    }
  } catch (error) {
    next(error);
  }
}

export async function createProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectName = req.body.projectName;
    const createdProject = await projectService.createProject(projectName);
    res.status(201).json(createdProject);
  } catch (error) {
    next(error);
  }
}

import pg from "../../config/knexfile";
import { Project } from "../models/Project";

export class ProjectService {
  async createProject(projectName: string): Promise<Project> {
    if (!projectName) {
      throw new Error("Project name doesn't exist");
    }
    if (projectName.length < 3) {
      throw new Error("Project name must exceed 3 characters");
    }

    const [projectId] = await pg("project")
      .insert({ project_name: projectName })
      .returning("id");

    const project = await pg("project").where({ id: projectId }).first();

    return project;
  }

  async getProjects(): Promise<Project[]> {
    const response = await pg.select().table("project");
    return response;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const response = await pg("project").where({ id }).first();
    return response || null;
  }
}

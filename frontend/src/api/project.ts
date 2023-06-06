import axios from "axios";

const baseURL = "http://localhost:3001/api/project";

export async function getProjects() {
  try {
    const { data } = await axios.get<Project[]>(baseURL, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return [];
  }
}

export async function createProject(project: Project) {
  try {
    const { data } = await axios.post<Project>(baseURL, project, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return [];
  }
}

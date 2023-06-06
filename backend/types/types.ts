import { Request, Response } from "express";

type Day = {
  id: number;
  date: Date;
};

type Project = {
  id: number;
  projectName: string;
};

interface Entry {
  id: number;
  hours: number;
  project_name: number;
  description: string;
  day: number;
}

type RequestBody<T> = Request<{}, {}, T>;

export { Day, Project, Entry, RequestBody };
import { Request, Response } from "express";

type Day = {
  id: number;
  date: Date;
};

type Project = {
  id: number;
  project_name: string;
};

interface Entry {
  id: number;
  hours: number;
  project_id: string;
  description: string;
  day: number;
}

type RequestBody<T> = Request<{}, {}, T>;

export { Day, Project, Entry, RequestBody };

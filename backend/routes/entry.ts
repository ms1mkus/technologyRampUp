import { Request, Response, NextFunction, Router } from "express";
import pg from "../knexfile";

const entryRouter = Router();

entryRouter.post("/", entryPostRouteHandler);

export async function entryPostRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { hours, project_name, description, day } = req.body;

    if (typeof hours !== "number" || isNaN(hours) || hours <= 0) {
      throw new Error("Invalid value for hours");
    }
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("Invalid value for description");
    }
    if (typeof day !== "number" || isNaN(day) || day <= 0) {
      throw new Error("Invalid value for day");
    }

    const response = await pg("entry")
      .insert({
        hours,
        project_name,
        description,
        day,
      })
      .returning("*");

    res.json(response);
  } catch (error) {
    next(error);
  }
}

export default entryRouter;

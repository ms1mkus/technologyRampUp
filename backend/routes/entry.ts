import { Response, NextFunction, Router } from "express";
import { Entry, RequestBody } from "../types/types";
import { createDay, getDayObjectByDate } from "./day";
import setTimeToZero from "../utils/dateFormatter";
import { getProjectById } from "./project";
import pg from "../knexfile";

const entryRouter = Router();

entryRouter.post("/", entryPostRouteHandler);
entryRouter.delete("/:id", entryDeleteRouteHandler);

export async function entryPostRouteHandler(
  req: RequestBody<Entry>,
  res: Response,
  next: NextFunction
) {
  try {
    const { hours, project_id, description, day } = req.body;
    if (typeof hours !== "number" || isNaN(hours) || hours <= 0) {
      throw new Error("Invalid value for hours");
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length < 5
    ) {
      throw new Error("Invalid value for description");
    }
    if (typeof project_id !== "string" || project_id.trim() === "") {
      throw new Error("Invalid value for project ID");
    }
    if (typeof day !== "string") {
      throw new Error("Invalid value for day");
    }
    if (!Date.parse(day)) {
      throw new Error("Invalid value for day");
    }
    if (!(await getProjectById(project_id))) {
      throw new Error("The project inputted does not exist in the database.");
    }

    const formattedDay = new Date(day);
    setTimeToZero(formattedDay);

    let selectedDay = await getDayObjectByDate(formattedDay);
    if (selectedDay === null) {
      selectedDay = await createDay(formattedDay);
    }

    const Entry = await pg
      .table("entry")
      .insert({
        hours: hours,
        description: description,
        project_id: project_id,
        day: selectedDay.id,
      })
      .returning("*");

    res.json(Entry);
  } catch (error) {
    next(error);
  }
}

export async function entryDeleteRouteHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const entryId = req.params.id;

    if (!entryId || typeof entryId !== "string" || entryId.trim() === "") {
      throw new Error("Invalid value for entry ID");
    }

    const deletedEntry = await pg
      .table("entry")
      .where({ id: entryId })
      .del()
      .returning("*");

    if (deletedEntry.length === 0) {
      throw new Error("Entry not found");
    }
    res.json(deletedEntry);
  } catch (error) {
    next(error);
  }
}

export default entryRouter;

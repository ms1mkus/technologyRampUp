import { Response, NextFunction, Router } from "express";
import pg from "../knexfile";
import { Day, RequestBody } from "../types/types";

const dayRouter = Router();
dayRouter.get("/", dayRouteHandler);

async function dayRouteHandler(
  req: RequestBody<Day>,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await pg.select().table("day");
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function getDayObjectByDate(day: Date): Promise<Day | null> {
  const response = await pg
    .from("day")
    .select()
    .table("day")
    .where({ date: day })
    .first();
  console.log(response);
  return response || null;
}

export async function createDay(day: Date): Promise<Day> {
  const [createdDay] = await pg
    .table("day")
    .insert({ date: day })
    .returning("*");
  return createdDay;
}

export default dayRouter;

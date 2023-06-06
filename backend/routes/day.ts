import { Request, Response, NextFunction, Router } from "express";
import pg from "../knexfile";

const dayRouter = Router();

dayRouter.get("/", dayRouteHandler);

async function dayRouteHandler(
  req: Request,
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

export default dayRouter;

import { Request, Response, NextFunction } from "express";
import { DayService } from "../services/DayService";

const dayService = new DayService();

export async function getDaysController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const days = await dayService.getDays();
    res.json(days);
  } catch (error) {
    next(error);
  }
}

export async function getDayByDateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const date = req.body.date;
    const day = await dayService.getDayObjectByDate(new Date(date));
    if (day) {
      res.json(day);
    } else {
      res.status(404).json({ message: "Day not found" });
    }
  } catch (error) {
    next(error);
  }
}

export async function createDayController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const date = new Date();
    const createdDay = await dayService.createDay(date);
    res.status(201).json(createdDay);
  } catch (error) {
    next(error);
  }
}

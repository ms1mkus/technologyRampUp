import pg from "../../config/knexfile";
import { Day } from "../models/Day";

export class DayService {
  async getDays(): Promise<Day[]> {
    try {
      const response = await pg.select().table("day");
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDayObjectByDate(day: Date): Promise<Day | null> {
    try {
      const response = await pg
        .from("day")
        .select()
        .table("day")
        .where({ date: day })
        .first();
      console.log(response);
      return response || null;
    } catch (error) {
      throw error;
    }
  }

  async createDay(day: Date): Promise<Day> {
    try {
      const [createdDay] = await pg
        .table("day")
        .insert({ date: day })
        .returning("*");
      return createdDay;
    } catch (error) {
      throw error;
    }
  }
}

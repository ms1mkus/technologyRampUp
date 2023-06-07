import pg from "../../config/knexfile";
import { Day } from "../models/Day";

export class DayService {
  async getDays() {
    try {
      const response = await pg.select<Day[]>().table("day");
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDayObjectByDate(day: Date) {
    try {
      const response = await pg
        .from("day")
        .select<Day[]>()
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

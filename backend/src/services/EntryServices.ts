import { Entry } from "../models/Entry";
import setTimeToZero from "../utils/dateFormatter";
import pg from "../../config/knexfile";
import { ProjectService } from "./ProjectService";
import { DayService } from "./DayService";
import { EntryByDay } from "../models/EntryByDay";

export class EntryService {
  private projectService: ProjectService;
  private dayService: DayService;

  constructor() {
    this.projectService = new ProjectService();
    this.dayService = new DayService();
  }
  async createEntry(entry: Entry): Promise<Entry> {
    try {
      const { hours, project_id, description, day } = entry;
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
      if (typeof project_id !== "number") {
        throw new Error("Invalid value for project ID");
      }
      if (typeof day !== "string") {
        throw new Error("Invalid value for day");
      }
      if (!(await this.projectService.getProjectById(project_id))) {
        throw new Error("The project inputted does not exist in the database.");
      }
      const formattedDay = new Date(day);
      setTimeToZero(formattedDay);

      let selectedDay = await this.dayService.getDayObjectByDate(formattedDay);
      if (selectedDay === null) {
        selectedDay = await this.dayService.createDay(formattedDay);
      }

      const createdEntry = await pg
        .table("entry")
        .insert({
          hours: hours,
          description: description,
          project_id: project_id,
          day: selectedDay.id,
        })
        .returning("*");

      return createdEntry[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteEntry(entryId: string): Promise<Entry> {
    try {
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

      return deletedEntry[0];
    } catch (error) {
      throw error;
    }
  }
  async getEntries(day?: string): Promise<EntryByDay[]> {
    try {
      if (!day) {
        return await pg.table("entry");
      }
      const formattedDay = new Date(day);
      if (isNaN(formattedDay.getTime())) {
        throw new Error("Invalid value for day");
      }

      setTimeToZero(formattedDay);
      console.log(formattedDay);

      const dayRecord = await pg
        .table("day")
        .where({ date: formattedDay })
        .first();
      if (!dayRecord) {
        return [];
      }

      const filteredEntriesByDay = await pg
        .table("entry")
        .where({ day: dayRecord.id })
        .join("project", "entry.project_id", "=", "project.id")
        .select(
          "entry.id",
          "entry.description",
          "project.project_name",
          "entry.hours"
        );

      return filteredEntriesByDay;
    } catch (error) {
      throw error;
    }
  }
}

import { Request, Response, NextFunction } from "express";
import { Entry } from "../models/Entry";
import { EntryService } from "../services/EntryServices";

const entryService = new EntryService();

export async function getEntriesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const day = req.body.day as string;
    const entries = await entryService.getEntries(day);
    res.json(entries);
  } catch (error) {
    next(error);
  }
}

export async function createEntryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const entryData: Entry = req.body;
    const createdEntry = await entryService.createEntry(entryData);
    res.status(201).json(createdEntry);
  } catch (error) {
    next(error);
  }
}

export async function deleteEntryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const entryId = req.params.id;
    const deletedEntry = await entryService.deleteEntry(entryId);
    res.json(deletedEntry);
  } catch (error) {
    next(error);
  }
}

import { Router } from "express";
import {
  getEntriesController,
  createEntryController,
  deleteEntryController,
} from "../controllers/entryController";

const entryRouter = Router();

entryRouter.get("/:id", getEntriesController);
entryRouter.post("/", createEntryController);
entryRouter.delete("/:id", deleteEntryController);

export default entryRouter;

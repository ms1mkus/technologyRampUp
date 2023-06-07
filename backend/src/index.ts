import express, { Express } from "express";
import cors from "cors";
import projectRouter from "./routes/projectRoutes";
import dayRouter from "./routes/dayRoutes";
import entryRouter from "./routes/entryRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import pg from "../config/knexfile";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/project", projectRouter);
app.use("/api/day", dayRouter);
app.use("/api/entry", entryRouter);

app.use(errorHandler);

const PORT = 3001;

pg.raw("SELECT 1")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} with PostgreSQL connected`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error);
  });

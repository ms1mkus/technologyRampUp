import express, { Express } from "express";
import projectRouter from "./routes/project";
import dayRouter from "./routes/day";
import { errorHandler } from "./middlewares/errorHandler";
import entryRouter from "./routes/entry";

const app: Express = express();
app.use(express.json());

app.use("/api/project", projectRouter);
app.use("/api/day", dayRouter);
app.use("/api/entry", entryRouter);

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

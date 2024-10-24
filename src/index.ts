import express, { Request, Response } from "express";
import typeRoute from "./routes/type";
import noteRoute from "./routes/note";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/types", typeRoute);
app.use("/api/notes", noteRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello typescript");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

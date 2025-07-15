import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { database } from "./database/database.js";
import urlRoutes from "./routes/url.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", urlRoutes);

app.listen(PORT, () => {
  database().then(() => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

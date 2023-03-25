import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import {initiate} from "./db/db";
import userRoute from "./routes/userRoute";

const app: Application = express();
const PORT = Number(process.env.PORT || 6000);

app.use(cors());
app.use(express.json());

initiate();

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({ message: "Chat API is Running!!!" });
});

// Mount Routes
app.use("/api/chat", userRoute)

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

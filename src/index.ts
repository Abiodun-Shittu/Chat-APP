import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { initiate } from "./db/db";
import userRoute from "./routes/userRoute";
import { errorResponse } from "./services/response";
import { httpErrors } from "./services/errors";
import { handleFormData } from "./services/multipart";

const app: Application = express();
const PORT = Number(process.env.PORT || 6000);

app.use(cors());
app.use(express.json());

initiate();

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({ message: "Chat API is Running!!!" });
});

// Middleware to handle multipart/form-data requests
app.use(handleFormData);

// Mount Routes
app.use("/api/users", userRoute);

// Catch-all 404 route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(
		errorResponse(
			res,
			httpErrors.NotFoundError,
			`This route ${req.originalUrl} does not exist on this server.`
		)
	);
});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

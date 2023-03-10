import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 6000);

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

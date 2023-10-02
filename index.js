import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/apiuser", userRoutes);
app.use("/apiposts", postRoutes);

//serveing the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
	res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
		res.status(500).send(err);
	});
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch((error) => console.log(error));

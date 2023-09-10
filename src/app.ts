import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Enable CORS for all routes (adjust the options as needed)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

export default app;

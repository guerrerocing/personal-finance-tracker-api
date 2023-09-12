import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

// Enable CORS for all routes (adjust the options as needed)
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Define API routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;

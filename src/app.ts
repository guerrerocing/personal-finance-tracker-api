import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { dataSource } from "./app-data-source";

export async function main() {
  await dataSource.initialize();
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

  return app;
}

export default main;

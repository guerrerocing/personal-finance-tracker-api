import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle errors and send an appropriate response
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

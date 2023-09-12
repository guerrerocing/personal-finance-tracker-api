import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { dataSource } from "../../app-data-source";

const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret_key";

export async function registerUser(
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  // Check if user already exists
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(); //Generate salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = userRepository.create({
    username,
    password: hashedPassword,
  });
  await userRepository.save(newUser);

  await dataSource.destroy();

  // Generate and send JWT token
  const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
    expiresIn: "1w",
  });

  return res
    .status(201)
    .json({ message: "User registered, now you can logIn", token });
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { username } });
  await dataSource.destroy();
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const coparedUser = await bcrypt.compare(password, user.password);
  if (!coparedUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
    expiresIn: "1w",
  });

  return res.status(200).json({ message: "Login successful", token });
};

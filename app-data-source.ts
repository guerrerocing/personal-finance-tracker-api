import { DataSource } from "typeorm";
import { Transaction } from "./src/entities/transaction.entity";
import { User } from "./src/entities/user.entity";

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User, Transaction],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  logging: true,
  synchronize: true,
});

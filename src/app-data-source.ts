import { DataSource } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { User } from "./entities/user.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [User, Transaction],
  migrations: ["./migrations/**/*{.ts,.js}"],
  logging: true,
  synchronize: true,
});

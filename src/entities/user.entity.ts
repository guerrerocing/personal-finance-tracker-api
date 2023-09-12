import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./transaction.entity"; // Import the Transaction model

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[]; // Define the relationship with transactions
}

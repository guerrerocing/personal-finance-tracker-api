import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  amount!: number;

  @Column({ type: "enum", enum: ["income", "expense"] }) // Use enum for 'type'
  type!: "income" | "expense";

  @CreateDateColumn() // Add a timestamp for the transaction date
  date!: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user!: User;
}

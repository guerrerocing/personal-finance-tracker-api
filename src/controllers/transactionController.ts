// Import necessary modules and dependencies

import { Request, Response } from "express";
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";

import { dataSource } from "../../app-data-source";

// Function to create a new transaction (income or expense)
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, type } = req.body;
    const userId = res.locals.user.userId;
    await dataSource.initialize();
    const transactionRepository = dataSource.getRepository(Transaction);
    const userRepository = dataSource.getRepository(User);

    // Check if the user exists
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      await dataSource.destroy();
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new transaction
    const newTransaction = transactionRepository.create({
      description,
      amount,
      type,
      user,
    });

    await transactionRepository.save(newTransaction);

    await dataSource.destroy();

    return res
      .status(201)
      .json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to edit a transaction
export const editTransaction = async (req: Request, res: Response) => {
  try {
    const { id, description, amount, type, date } = req.body;
    const userId = res.locals.user.userId;
    await dataSource.initialize();

    const transactionRepository = dataSource.getRepository(Transaction);

    // Check if the transaction exists and belongs to the user
    const existingTransaction = await transactionRepository.findOne({
      where: { id: id },
      relations: ["user"],
    });

    if (!existingTransaction || existingTransaction.user.id !== userId) {
      await dataSource.destroy();

      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction, including the date
    existingTransaction.description = description;
    existingTransaction.amount = amount;
    existingTransaction.type = type;
    existingTransaction.date = date;

    await transactionRepository.save(existingTransaction);
    await dataSource.destroy();

    return res.status(200).json({
      message: "Transaction updated",
      transaction: existingTransaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to list transactions for a specific user with optional date filtering
export const listTransactions = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.userId;
    const { startDate, endDate } = req.query;
    await dataSource.initialize();

    const transactionRepository = dataSource.getRepository(Transaction);

    const queryBuilder = transactionRepository
      .createQueryBuilder("transaction")
      .where("transaction.user = :userId", { userId });

    if (startDate && endDate) {
      queryBuilder.andWhere(
        "transaction.date BETWEEN :startDate AND :endDate",
        {
          startDate,
          endDate,
        }
      );
    }

    const transactions = await queryBuilder
      .orderBy("transaction.date", "DESC")
      .getMany();

    await dataSource.destroy();

    return res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.userId;
    const { transactionId } = req.params;
    console.log(transactionId);
    await dataSource.initialize();

    const transactionRepository = dataSource.getRepository(Transaction);
    const transaction = await transactionRepository.findOne({
      where: {
        id: Number(transactionId),
      },
    });

    // Check if the transaction exists and belongs to the user
    if (!transaction) {
      await dataSource.destroy();

      return res.status(404).json({ message: "Transaction not found" });
    }

    await transactionRepository.remove(transaction);
    await dataSource.destroy();

    return res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to calculate financial summaries (total income, total expenses, balance)
export const calculateFinancialSummary = async (
  req: Request,
  res: Response
) => {
  try {
    await dataSource.initialize();
    const userId = res.locals.user.userId;
    const { startDate, endDate } = req.query;

    const transactionRepository = dataSource.getRepository(Transaction);

    const queryBuilder = transactionRepository
      .createQueryBuilder("transaction")
      .where("transaction.user = :userId", { userId });

    if (startDate && endDate) {
      queryBuilder.andWhere(
        "transaction.date BETWEEN :startDate AND :endDate",
        {
          startDate,
          endDate,
        }
      );
    }

    const transactions = await queryBuilder.getMany();
    // Separate income and expense transactions
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income"
    );
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense"
    );

    // Calculate the totalIncome and totalExpenses
    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    const totalExpenses = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    // Calculate the balance
    const balance = totalIncome - totalExpenses;
    await dataSource.destroy();

    return res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

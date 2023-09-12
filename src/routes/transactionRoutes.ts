import { Router } from "express";
import {
  listTransactions,
  createTransaction,
  calculateFinancialSummary,
  editTransaction,
  deleteTransaction,
} from "../controllers/transactionController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Get all transactions (income or expense)
router.get("/", authenticateUser, listTransactions);

// Create a new transaction (income or expense)
router.post("/create", authenticateUser, createTransaction);

// Edit a transaction (income or expense)
router.put("/edit", authenticateUser, editTransaction);

// Delete a transaction
router.delete("/delete/:transactionId", authenticateUser, deleteTransaction);

// Get financial summaries (total income, total expenses, balance)
router.get("/summary", authenticateUser, calculateFinancialSummary);

export default router;

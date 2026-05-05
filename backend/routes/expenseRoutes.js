  const express = require('express');
  const {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} = require('../controllers/expenseController');
 const {protect} = require('../middleware/authMiddleware');
 
 const router = express.Router();
 
 router.post("/addExpense", protect, addExpense);
 router.get("/getAllExpense", protect, getAllExpense);
 router.delete("/delete/:id", protect, deleteExpense);
 router.get("/download/excel", protect, downloadExpenseExcel);
 
 module.exports = router;
 
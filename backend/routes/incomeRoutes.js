 const express = require('express');
 const {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/addIncome", protect, addIncome);
router.get("/getAllIncome", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.get("/download/excel", protect, downloadIncomeExcel);

module.exports = router;

const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// Add expense controller
exports.addExpense = async (req, res) => {
    try {
        const { icon, category, amount, date } = req.body;
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Category, amount, and date are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully", expense: newExpense });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all expense controller
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error("Error fetching expense:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete expense controller
exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        await Expense.findOneAndDelete({ _id: req.params.id });
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Download expense as Excel controller
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            amount: item.amount,
            date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense.xlsx");

        res.download("expense.xlsx", "expense.xlsx", (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });

    } catch (error) {
        console.error("Error downloading expense Excel:", error);
        res.status(500).json({ message: "Server error" });
    }
};
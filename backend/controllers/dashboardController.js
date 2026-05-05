const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getdashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));

        // ✅ FIX — changed "user" to "userId" in all $match and .find() calls
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("Total Income:", { totalIncome, userID: isValidObjectId(userId) });
        console.log("Total Expense:", { totalExpense, userID: isValidObjectId(userId) });

        // ✅ FIX — changed "user" to "userId"
        const last60DaysTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const totalIncomeLast60Days = last60DaysTransactions.reduce(
            (total, transaction) => total + transaction.amount, 0
        );

        // ✅ FIX — changed "user" to "userId"
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const totalExpenseLast30Days = last30DaysExpenseTransactions.reduce(
            (total, transaction) => total + transaction.amount, 0
        );

        // ✅ FIX — changed "user" to "userId" in both Income and Expense finds
        const recentIncomeTransactions = [
            ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            )
        ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: totalExpenseLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: totalIncomeLast60Days,
                transactions: last60DaysTransactions
            },
            recentTransactions: recentIncomeTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
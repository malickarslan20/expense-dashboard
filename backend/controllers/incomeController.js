const User= require("../models/User");
const Income = require("../models/Income");
const { writeXLSX } = require("xlsx");
// const excelJS = require('exceljs');
const xlsx = require("xlsx");


//Add income controller
exports.addIncome = async (req, res) => {
    try {
        const {icon, source, amount, date} = req.body;
        const userId = req.user._id;
 
        if(!userId){
            return res.status(401).json({ message: "User not authenticated" });
        }
        // Validate required fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Source, amount, and date are required" });
        }

        const newIncome= new Income ({
            userId,
            icon,
            source,
            amount,
            date : new Date(date),
        })

        await newIncome.save();
        res.status(201).json({ message: "Income added successfully", income: newIncome });

    } 
catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//Get all income controller
exports.getAllIncome = async (req, res) => {
     const userId = req.user._id;
        
    try {
       
const income= await Income.find({ userId }).sort({ date: -1 });
res.json(income);

    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//Delete income controller
exports.deleteIncome = async (req, res) => {
    const userId = req.user._id;
    try {
            await Income.findOneAndDelete({ _id: req.params.id});
            res.json({ message: "Income deleted successfully" });
    }
    catch (error) { 
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Download income as Excel controller
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income.xlsx");

        res.download("income.xlsx", "income.xlsx", (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });

    } catch (error) {
        console.error("Error downloading income Excel:", error);
        res.status(500).json({ message: "Server error" });
    }
};
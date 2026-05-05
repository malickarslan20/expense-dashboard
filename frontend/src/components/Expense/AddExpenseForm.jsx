import React, { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

function AddExpenseForm({ onAddExpense }) {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => {
        setExpense(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Expense Category</label>
                <input
                    type="text"
                    value={expense.category}
                    onChange={({ target }) => handleChange("category", target.value)}
                    placeholder="Food, Transport, Entertainment..."
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all placeholder:text-gray-400"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    value={expense.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all placeholder:text-gray-400"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    value={expense.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                />
            </div>

            <button
                type="button"
                onClick={() => onAddExpense(expense)}
                className="flex items-center justify-center gap-2 mt-2 w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
                <LuPlus className="w-4 h-4" />
                Add Expense
            </button>
        </div>
    )
}

export default AddExpenseForm
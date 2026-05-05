import React, { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

function AddIncomeForm({ onAddIncome }) {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => {
        setIncome(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Income Source</label>
                <input
                    type="text"
                    value={income.source}
                    onChange={({ target }) => handleChange("source", target.value)}
                    placeholder="Freelance, Salary, Business..."
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all placeholder:text-gray-400"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    value={income.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all placeholder:text-gray-400"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    value={income.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
                />
            </div>

            <button
                onClick={() => onAddIncome(income)}
                className="flex items-center justify-center gap-2 mt-2 w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
                <LuPlus className="w-4 h-4" />
                Add Income
            </button>
        </div>
    )
}

export default AddIncomeForm
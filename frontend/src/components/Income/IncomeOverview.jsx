import React, { useState, useEffect } from 'react'
import { LuPlus } from "react-icons/lu"
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeChartData } from '../../utils/helper';

function IncomeOverview({ transactions, onAddIncome }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div className=''>
                    <h2 className="text-lg">Income OverView</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Track your Earnings Over time and analyze your income sources</p>
                </div>
                <button onClick={onAddIncome} className='add-btn'>
                    <LuPlus />
                    Add Income
                </button>
            </div>

            <div className='mt-10'>
                <CustomBarChart data={chartData} xDataKey="month" />
            </div>
        </div>
    )
}

export default IncomeOverview
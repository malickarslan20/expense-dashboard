import React, { useState, useEffect } from 'react'
import CustomPieCharts from '../Charts/CustomPieCharts'

const COLORS = ['#875CF5', '#FAC837', '#FF6900'];

function RecentIncomeWithChart({ data = [], totalIncome }) {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const prepareChartData = () => {
            const preparedData = (data || []).map(item => ({
                name: item?.source || 'Unknown',
                amount: item?.amount || 0,
            }));
            setChartData(preparedData);
        };
        prepareChartData();
    }, [data]);

    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-sm text-gray-400">
                    No income data for the last 60 days
                </div>
            ) : (
                <CustomPieCharts
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    showTextAnchor
                    colors={COLORS}
                />
            )}
        </div>
    )
}

export default RecentIncomeWithChart
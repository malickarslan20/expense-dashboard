import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white p-2 border border-gray-300 rounded-lg shadow'>
                <p className='text-xs font-semibold text-purple-800 mb-1'>
                    {payload[0].payload.category || payload[0].payload.month}
                </p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
                </p>
            </div>
        );
    }
};

const getBarColor = (index) => {
    return index % 2 === 0 ? "#8884d8" : "#82ca9d";
};

function CustomBarChart({ data = [], xDataKey = "category" }) {
    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xDataKey} tick={{ fontSize: 12, fill: "#666" }} stroke='none'/>
                    <YAxis tick={{ fontSize: 12, fill: "#666" }} stroke='none'/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="amount" name="Amount" fill="#8884d8" activeDot={{ r: 8, fill: "yellow" }} activeStyle={{ fill: "green" }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
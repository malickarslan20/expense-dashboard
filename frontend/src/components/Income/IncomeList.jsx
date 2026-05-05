import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment';

function IncomeList({ transactions, onDelete, onDownload }) {
    return (
        <div className='card'>
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold">Income Sources</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        amount={income.amount}
                        date={moment(income.date).format('YYYY-MM-DD')}
                        icon={income.icon}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList
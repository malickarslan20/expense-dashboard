import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment';
function RecentIncome({ transactions, onSeeMore }) {
  return (
    <div className='card'>
    <div className="flex items-center justify-between">
      <h3 className="text-lg ">Recent Income</h3>
     
      <button
        onClick={onSeeMore}
        className="card-btn"
      >
        See All <LuArrowRight className='ml-1 text-base'/>
      </button>
    </div>
        <div className='mt-6'>
          
          {transactions?.slice(0,5)?.map(item => (
            <TransactionInfoCard
             key={item._id}
            title={item.source}
            icon= {item.icon}
            date={moment(item.date).format("MMM Do YY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
            />
         ) )} 
        
        </div>

    </div>
  )
}

export default RecentIncome
import React,{useState,useEffect} from 'react'
import { prepareExpenseLineCharData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart ';

function ExpenseOverview({transactions, onAddExpense}) {
    const [charData, setChartData] = useState([]);

    useEffect(() => {
        // Logic to calculate chart data based on transactions
        const results= prepareExpenseLineCharData(transactions);
        setChartData(results);

        return () => {}
    }, [transactions]);

  return (

    <div className="card">
        <div className='flex items-center justify-between '>
            <div className=''>
                <h5 className='text-lg font-semibold'>Expense Overview</h5>
                <p className='xs text-gray-400 mt-0.5'> Track your expenses over time and gain insights into your spending habits.</p>

            </div>

            <button className="add-btn" onClick={onAddExpense}>
             <LuPlus className="text-lg" />   Add Expense
            </button>
        </div>
        <div className="mt-10">
            {/* Chart component to visualize expense data */}
            <CustomLineChart  data={charData} />
            {/* <ExpenseLineChart data={charData} /> */}
        </div>

    </div>
  )
}

export default ExpenseOverview
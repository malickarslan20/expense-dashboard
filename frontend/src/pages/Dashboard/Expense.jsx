import React,{useState, useEffect} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipath';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList ';

function Expense() {
    useUserAuth();
  
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
      data: null
    });
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);



    //Get All Expense Details
  const fetchExpenseDetails = async ()=>{
    if (loading) return;
    setLoading(true);

    try {

      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
       console.log("API response:", response.data); 
      setExpenseData(response.data);
    } catch (error) {
      console.error('Error fetching expense details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modal Add Expense
const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category || !amount || !date) {
        toast.error("Please fill all the fields");
        return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
    }

    try {
   
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
            category,
            amount: Number(amount),
            date,
            icon,
        });
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
    } catch (error) {
        console.error('Error adding expense:', error.response?.data?.message);
        toast.error("Failed to add expense");
    }
};


//Delete Expense
const deleteExpense = async (id)=>{
  try {
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
    toast.success("Expense deleted successfully");
    fetchExpenseDetails();
  } catch (error) {
    console.error('Error deleting expense:', error.response?.data?.message);
    toast.error("Failed to delete expense");
  }
}

//Download Expense Data

const handleDownloadExpenseDetails = async () => {
    try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expense_details.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading expense details:', error);
        toast.error("Failed to download expense details");
    }
};



useEffect(() => {

    fetchExpenseDetails();

    return () => {}
}, []);
  




  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
              
              />

          </div>
         <ExpenseList
    transactions={expenseData}
    onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
    onDownload={handleDownloadExpenseDetails}
/>
        </div>

        <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add New Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}
           onCancel={() => setOpenAddExpenseModal(false)} />
         
        </Modal>

       

<Modal
    isOpen={openDeleteAlert.show}
    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
    title="Delete Expense"
>
    <p className="text-sm text-gray-600">Are you sure you want to delete this expense?</p>
    <div className="flex justify-end gap-3 mt-4">
        <button
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setOpenDeleteAlert({ show: false, data: null })}
        >
            Cancel
        </button>
        <button
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
                deleteExpense(openDeleteAlert.data);
                setOpenDeleteAlert({ show: false, data: null });
            }}
        >
            Delete
        </button>
    </div>
</Modal>


        </div>
        </DashboardLayout>
  )
}

export default Expense
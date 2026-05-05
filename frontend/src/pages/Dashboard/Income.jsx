import React,{useState,useEffect} from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipath';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import { useUserAuth } from '../../hooks/useUserAuth';

function Income() {

  useUserAuth();


  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
    data: null
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async ()=>{
    if (loading) return;
    setLoading(true);

    try {

      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      setIncomeData(response.data);
    } catch (error) {
      console.error('Error fetching income details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Modal Add Income
const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source || !amount || !date) {
        toast.error("Please fill all the fields");
        return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
    }

    try {
   
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
            source,
            amount: Number(amount),
            date,
            icon,
        });
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
    } catch (error) {
        console.error('Error adding income:', error.response?.data?.message);
        toast.error("Failed to add income");
    }
};

//Delete Income
const deleteIncome = async (id)=>{
  try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
    toast.success("Income deleted successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error('Error deleting income:', error.response?.data?.message);
    toast.error("Failed to delete income");
  }
}

//Download Income Data

const handleDownloadIncomeDetails = async ()=>{
  try {
        const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'income_details.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading income details:', error);
        toast.error("Failed to download income details");
   
}
}

useEffect(()=>{
  fetchIncomeDetails();

  return ()=>{}
},[])

  return (
   <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
              <div className="">
                <IncomeOverview
                transactions= {incomeData}
                onAddIncome={() => setOpenAddIncomeModal(true)}
                
                />
              </div>

              <IncomeList
              transactions={incomeData}
              onDelete = {(id) => {
                setOpenDeleteAlert({show: true, data: id})
              }}
              onDownload={handleDownloadIncomeDetails}
              
              
              />
            
          </div>
          <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
          >

         <AddIncomeForm
         onAddIncome={handleAddIncome}
         />
          </Modal>

          <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          >
            <p>Are you sure you want to delete this income?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setOpenDeleteAlert({show: false, data: null})}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  // Implement delete logic here
                  deleteIncome(openDeleteAlert.data);
                  setOpenDeleteAlert({show: false, data: null});
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

export default Income
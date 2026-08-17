export const BASE_URL = import.meta.env.VITE_API_URL;;

//api call utilis.js
export const API_PATHS = {
    AUTH : {
    LOGIN : "api/v1/auth/login",
    REGISTER : "api/v1/auth/register",
    GET_USER_INFO : "api/v1/auth/getUser",
},

DASHBOARD :{
    GET_DATA: "api/v1/dashboard",
},
INCOME :{
 ADD_INCOME : "api/v1/income/addIncome",
 GET_ALL_INCOME : "api/v1/income/getAllIncome",
DELETE_INCOME : (incomeId) => `api/v1/income/delete/${incomeId}`,
DOWNLOAD_INCOME : `api/v1/income/download/excel`,
},
EXPENSE :{
    ADD_EXPENSE : "api/v1/expense/addExpense",
    GET_ALL_EXPENSE : "api/v1/expense/getAllExpense",
    DELETE_EXPENSE : (expenseId) => `api/v1/expense/delete/${expenseId}`,
    DOWNLOAD_EXPENSE : `api/v1/expense/download/excel`,
},
IMAGE :{
    UPLOAD_IMAGE : "api/v1/auth/upload-image",
}  
};
import moment from "moment";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getInitials = (name)=>{
    if(!name) return "";

    const words= name.split("");
    let initials= "";

    for (let i=0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }
;
    return initials.toUpperCase();

};



export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return '';

    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionPart ? `${formattedInteger}.${fractionPart}` : formattedInteger;
};

export const  prepareExpenseBarChartData = (data)=>{
    const ChartData = data.map (item => ({
        category: item?.category || "Uncategorized",
        amount: item?.amount,
       
    }));
    return ChartData;

}

export const prepareIncomeChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map(item => ({
        month: moment(item?.date).format("MMM YYYY"),
        amount: item?.amount,
        source: item?.source || "Unknown",
    }));

    return chartData;
};

export const prepareExpenseLineCharData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map(item => ({
        month: moment(item?.date).format("MMM YYYY"),
        amount: item?.amount,
        category: item?.category || "Uncategorized",
    }));
    return chartData;
};                                    
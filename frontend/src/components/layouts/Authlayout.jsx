import React from 'react';
import { LuTrendingDown } from 'react-icons/lu';



const Authlayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-semibold text-black'>Expense Tracker</h2>
                {children}
            </div>

            <div className="hidden md:flex md:w-[40vw] bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative flex-col items-center justify-start">

                {/* Top-left purple blob */}
                <div className="w-52 h-52 rounded-[40px] bg-purple-600 absolute -top-8 -left-6 z-0" />

                {/* Bottom-right border-only blob */}
                <div className="w-44 h-56 rounded-[40px] border-[3px] border-fuchsia-500 absolute top-[32%] -right-12 z-0" />

                {/* Bottom-left purple blob */}
                <div className="w-52 h-56 rounded-[40px] bg-violet-500 absolute -bottom-8 -left-6 z-0" />

                {/* Status card */}
                <div className="w-full z-10 mt-4">
                    <StatusInfoCard
                        icon={<LuTrendingDown />}
                        label="Track Your Income & Expenses"
                        value="430,000"
                        color="bg-purple-600"
                    />
                </div>

                {/* Chart image */}
                <img
                    src="/cards-2.jpeg"
                    alt="Auth"
                    className='w-[90%] absolute bottom-8 shadow-xl shadow-purple-500/20 rounded-2xl'
                />

            </div>
        </div>
    );
};

export default Authlayout;

const StatusInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex items-center gap-5 bg-white px-5 py-4 rounded-2xl shadow-lg shadow-purple-300/20 border border-purple-100 z-10 w-full max-w-xs">
            <div
                className={`w-11 h-11 flex items-center justify-center text-lg text-white ${color} rounded-full shadow-md flex-shrink-0`}
            >
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-400 mb-1 font-medium leading-tight">{label}</h6>
                <span className="text-2xl font-semibold text-gray-800">${value}</span>
            </div>
        </div>
    );
};
import React from 'react'

function InfoCard({ icon, label, value, color }) {
  return (
    <div className='flex items-center gap-4 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 p-5'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-2xl shrink-0`}>
        {icon}
      </div>

      <div className='flex flex-col'>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[22px] font-semibold text-gray-900'>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard
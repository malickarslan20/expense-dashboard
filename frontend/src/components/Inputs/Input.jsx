import React from 'react'
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, label, placeholder, type }) {
const [showpassword,setshowpassword] = useState(false);

const toggleshowPassword = () => {
  setshowpassword(!showpassword);
}
  return (
    <div className='text-[13px]  text-slate-800'>
      <label>{label}</label>

      <div className='input-box'>
      <input
       type= {type === "password" ? (showpassword ? "text" : "password") : type}
       placeholder={placeholder}
       className='w-full bg-transparent outline-none'
       value={value}
       onChange={(e) => onChange(e)}
      />
        {showpassword ? (
  <FaRegEyeSlash
    className="text-slate-500 cursor-pointer"
    onClick={toggleshowPassword}
  />
) : (
  <FaRegEye
    className="text-slate-500 cursor-pointer"
    onClick={toggleshowPassword}
  />
)}
</div>
    </div>
  )
}

export default Input
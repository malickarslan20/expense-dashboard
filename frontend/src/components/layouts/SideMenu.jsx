import React from 'react'
import { SIDEMENU_DATA } from "../../utils/data"
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'



function SideMenu({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  }


  return <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] overflow-y-auto">
    <div className=" flex flex-col items-center justify-center gap-2 mt-3 mb-3">
      {user?.profileImageUrl ? (
        <img
          src={user?.profileImageUrl || ""}
          alt="Profile Image"
          className="w-20 h-20 rounded-full object-cover bg-slate-400"
        />) : (
        <CharAvatar name={user?.name}
        width="w-20"
        height="h-20"
        fontSize="text-lg"
        />)
        }

      <h5 className="text-gray-950 font-medium leading-6">
        {user?.name || ""}
      </h5>
    </div>

    {SIDEMENU_DATA.map((item, index) => (
      <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 text-[15px] ${
          activeMenu == item.label 
            ? "text-white bg-purple-600" 
            : "text-gray-700 hover:bg-purple-400"
        } py-3 px-6 rounded-lg mb-3`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className="text-xl" />
        {item.label}
      </button>
    ))}
  </div>
}

export default SideMenu
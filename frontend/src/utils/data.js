import {
    LuLayoutDashboard,
    LuHandCoins,
   LuWallet,
    LuLogOut,
} from "react-icons/lu";

export const SIDEMENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWallet,  
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },

    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout",
    }
];
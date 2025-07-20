import { House ,ShoppingCart , Package2 , Truck , UsersRound , ChartLine } from 'lucide-react';
import {  type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sections(){

    
    const location = useLocation()
    const urlName = location.pathname
    

type FeildData = {
    name : string;
    icon : ReactNode;
    path : string;
}
const menuItems: FeildData[] = [
  { name: "Dashboard", icon: <House strokeWidth={1.5} size={20} />, path: "/dashboard" },
  { name: "Orders", icon: <ShoppingCart strokeWidth={1.5} size={20} />, path: "/orders" },
  { name: "Products", icon: <Package2 strokeWidth={1.5} size={20} />, path: "/products" },
  { name: "Suppliers", icon: <Truck strokeWidth={1.5} size={20} />, path: "/suppliers" },
  { name: "Customers", icon: <UsersRound strokeWidth={1.5} size={20} />, path: "/customers" },
  { name: "Analytics", icon: <ChartLine strokeWidth={1.5} size={20} />, path: "/analytics" },
];

    return (

        <div className="  w-[13%] h-[92vh] bg-[#f1f5f9]">

<nav className="w-full  px-5 pt-5">
    <ul className='flex flex-col  gap-5'>
        {menuItems.map((item , index )=>  (
            
                <Link
                to={item.path}
                >
            <li key={index}  className={`flex gap-1 items-center text-[.9rem]  cursor-pointer hover:bg-gray-200 rounded-[.2rem] p-3   font-medium  ${urlName === item.path ? " text-blue-700  bg-gray-200" : "text-gray-700 hover:bg-gray-200"} `}>

                {item.icon}{item.name}
                </li>
                </Link>
        )

        )}

    </ul>
</nav>

        </div>
    )
}

export default Sections;
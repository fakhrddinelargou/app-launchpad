import { House  } from 'lucide-react';
import {  type ReactNode } from 'react';

import {  NavLink} from 'react-router-dom';

function Sections(){

    
    

type FeildData = {
    name : string;
    icon : ReactNode;
    path : string;
}
const menuItems: FeildData[] = [
  { name: "Dashboard", icon: <House strokeWidth={1.5} size={20} />, path: "analytics/dashboard" },
//   { name: "Orders", icon: <ShoppingCart strokeWidth={1.5} size={20} />, path: "/orders" },
//   { name: "Products", icon: <Package2 strokeWidth={1.5} size={20} />, path: "/products" },
//   { name: "Suppliers", icon: <Truck strokeWidth={1.5} size={20} />, path: "/suppliers" },
//   { name: "Customers", icon: <UsersRound strokeWidth={1.5} size={20} />, path: "/customers" },
//   { name: "Analytics", icon: <ChartLine strokeWidth={1.5} size={20} />, path: "/analytics" },
];

    return (

        <div className="  w-[13%] h-auto min-h-[92vh] bg-[#fff]">


<nav className="w-full  px-2 pt-5">
    <ul className='flex flex-col  gap-5'>
        {menuItems.map((item , index )=>  {
            return ( 
<li  key={index}>
    <NavLink    to={"analytics/dashboard"}   className={({ isActive }) =>
    ` p-2 text-[.8rem] rounded-[.3rem]   flex items-center gap-2 font-medium hover:bg-gray-100
     ${isActive ? "bg-gray-200" : " "}`
  }>
{item.icon}{item.name}
    </NavLink>
</li>


    


            );
        }

        )}

    </ul>
</nav>

        </div>
    )
}

export default Sections;
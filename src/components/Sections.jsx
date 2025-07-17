import { House ,ShoppingCart , Package2 , Truck , UsersRound , ChartLine, LeafyGreen } from 'lucide-react';
import { useState } from 'react';

function Sections(){

    const [section,setSection] = useState()
console.log(section)
      const menuItems = [
    { name: "Dashboard", icon: <House strokeWidth={1.5} size={20} /> },
    { name: "Orders", icon: <ShoppingCart strokeWidth={1.5} size={20} /> },
    { name: "Products", icon: <Package2 strokeWidth={1.5} size={20} /> },
    { name: "Suppliers", icon: <Truck strokeWidth={1.5} size={20} /> },
    { name: "Customers", icon: <UsersRound strokeWidth={1.5} size={20} /> },
    { name: "Analytics", icon: <ChartLine strokeWidth={1.5} size={20} /> },
  ];

    return (

        <div className="bg-white  w-[13%] h-[92vh]">

<nav className="w-full  px-5 pt-5">
    <ul className='flex flex-col  gap-5'>
        {menuItems.map((item)=>  (
            
            <li key={item.name} onClick={() => setSection(item.name) } className={`flex gap-1 items-center text-[.9rem]  cursor-pointer hover:bg-gray-200 rounded-[.2rem] p-3   font-medium  ${section === item.name ? " text-blue-700  bg-gray-200" : "text-gray-700 hover:bg-gray-200"} `}>{item.icon}{item.name}</li>
        )

        )}

    </ul>
</nav>

        </div>
    )
}

export default Sections;
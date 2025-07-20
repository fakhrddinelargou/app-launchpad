import { useState, type ReactNode } from "react";
import { GoShieldLock } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { RiNotification4Fill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";



function ProfileSection(){

    const [selectSection , setSelectSection] = useState("Profile Info")

    type FeildData = {
        name : string;
        icon : ReactNode;
        path : string;
    }
const menuItems: FeildData[] = [
  { name: "Profile Info", icon: <TiUser   size={18} />, path: "/dashboard" },
  { name: "Email & Password", icon: <GoShieldLock  size={15} />, path: "/orders" },
  { name: "Notification", icon: <RiNotification4Fill   size={15} />, path: "/products" },
  { name: "Businesses", icon: <MdOutlineBusinessCenter   size={15} />, path: "/suppliers" },
  { name: "Integration", icon: <IoLinkOutline   size={15} />, path: "/customers" },

];
    return (
        <div className="border-r-1 border-gray-200 pl-6 pt-6  w-[20%] h-full">
            <h1 className="text-2xl font-bold pb-5">User profile management</h1>
            <nav>
                <ul className="flex flex-col gap-3 pr-10 ">
                    {menuItems.map((item, index) => {return (
                        <li key={index} onClick={()=> setSelectSection(item.name)} className={`hover:bg-gray-100 ${selectSection === item.name ? "bg-gray-100" : ""} p-2 text-[.8rem] rounded-[.3rem]  flex items-center gap-2 font-medium`}>{item.icon}{item.name}</li>
                    )})}

                </ul>
            </nav>
        </div>
    )


}


export default ProfileSection;
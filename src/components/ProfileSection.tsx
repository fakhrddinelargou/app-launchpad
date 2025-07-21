import { ArrowLeftFromLine } from "lucide-react";
import {  type ReactNode } from "react";
import { GoShieldLock } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { RiNotification4Fill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";




function ProfileSection(){


const location = useLocation();
const urlName = location.pathname

  console.log(urlName);

    // const [selectSection , setSelectSection] = useState("Profile Info")

    type FeildData = {
        name : string;
        icon : ReactNode;
        path : string;
    }
const menuItems: FeildData[] = [
  { name: "Profile Info", icon: <TiUser   size={18} />, path: "/ProfileInfo" },
  { name: "Email & Password", icon: <GoShieldLock  size={15} />, path: "/emailpassword" },
  { name: "Notification", icon: <RiNotification4Fill   size={15} />, path: "/notification" },
  { name: "Businesses", icon: <MdOutlineBusinessCenter   size={15} />, path: "/businesses" },
  { name: "Integration", icon: <IoLinkOutline   size={15} />, path: "/integration" },

];
    return (
        <div className=" flex flex-col border-r-1 border-gray-200 pl-6 pt-6  w-[20%] h-full">
            <h1 className="text-2xl font-bold pb-5">User profile management</h1>
            <nav>
                <ul className="flex flex-col gap-3 pr-10 ">
                    {menuItems.map((item, index) => {return (
                        <Link to={item.path} key={index}>
                        <li   className={`hover:bg-gray-100 ${urlName === item.path ? "bg-gray-100" : ""} p-2 text-[.8rem] rounded-[.3rem]  flex items-center gap-2 font-medium`}>{item.icon}{item.name}</li>
                        </Link>
                    )})}

                </ul>
            </nav>
            <Link to={"/dashboard"} className="mt-auto mb-4">
              <ArrowLeftFromLine size={20}  />
            </Link>
        </div>
    )


}


export default ProfileSection;
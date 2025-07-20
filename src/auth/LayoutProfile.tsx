

import ProfileSection from "../components/ProfileSection";
import { Outlet } from "react-router-dom";






const Profil =  ()=>{




return(
    <div className="flex items-center justify-center w-screen h-screen">
        <div className="overflow-hidden py-2  bg-white w-[95%] h-[90vh] rounded-3xl shadow-xl flex ">
            <ProfileSection/>
            <Outlet/>
        </div>
    </div>
)
}


export default Profil;
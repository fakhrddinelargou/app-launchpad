
import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function  Header(){


    const navigate = useNavigate()

    const handleProfil = ()=>{
        navigate("/profil")
    }
    return(
         <div className="bg-white border-b-1 border-gray-200 w-screen h-[8vh] flex items-center pr-5 justify-between">
    <div className='overflow-hidden w-55 h-10 flex items-center'>
        <img src="/logo.png" className="w-50 pl-5 " />
      
    </div>
    <div onClick={handleProfil} className='flex gap-1 text-[.9rem] items-center font-medium cursor-pointer'>
        <CircleUserRound size={25} strokeWidth={1.2} />

    </div>
  </div>
    )
}

export default Header;
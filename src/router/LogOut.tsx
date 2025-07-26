import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="absolute right-7 bottom-5 cursor-pointer text-[.8rem] flex items-center gap-2 font-bold text-blue-950 ">
      <TbLogout2 size={25} onClick={handleLogout} />
      Log Out
    </div>
  );
};

export default LogOut;

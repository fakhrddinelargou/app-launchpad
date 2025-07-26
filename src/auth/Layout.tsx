import Sections from "../components/Sections";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

// type Props = {
//   children: React.ReactNode;
// };

function Layout() {
  return (
    <div className="w-full ">
      <Header />
      <div className="flex  w-[99%] ">
        <Sections />

        <Outlet  />
        <div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

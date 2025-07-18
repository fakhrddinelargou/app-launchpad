import Sections from "../components/Sections";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

// type Props = {
//   children: React.ReactNode;
// };

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sections />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

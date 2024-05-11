import TopNav from "./components/TopNav";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <TopNav />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;

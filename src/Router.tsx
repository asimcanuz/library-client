import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import Layout from "./Layout";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import LoanList from "./pages/LoanList";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import ModDashboard from "./pages/Dashboards/ModDashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        
        <Route
          path="user"
          element={<RequireAuth allowedRoles={["ROLE_USER"]} />}
        >
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        <Route
          path="admin"
          element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}
        >
          <Route path="dashboard" element={<AdminDashboard/>} />
        </Route>

        <Route path="mod" element={<RequireAuth allowedRoles={["ROLE_MOD"]} />}>
          <Route path="dashboard" element={<ModDashboard/>} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_MOD"]} />}
        >
          <Route path="loans" element={<LoanList />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={["ROLE_ADMIN", "ROLE_MODE", "ROLE_USER"]}
            />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="books" element={<Books />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.role?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.accessToken ? (
    <h1>Unauthorized</h1>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default Routers;

import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import Layout from "./Layout";
import useAuth from "./hooks/useAuth";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />}
        >
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="admin" element={<h1>Admin</h1>} />
        </Route>
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

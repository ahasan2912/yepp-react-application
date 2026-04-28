import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'VENDOR') {
    return <Navigate to="/shop-overview" replace />;
  }

  if (user?.role === 'ADMIN') {
    return children ?? <Outlet />;
  }
  return <Navigate to="/shop-overview" replace />;
};

export default AdminRoute;

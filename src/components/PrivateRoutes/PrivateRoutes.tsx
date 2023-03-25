import { getUserFromSession } from "../../utils/index";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoutes = () => {
  const user = getUserFromSession();
  return user ? <Outlet /> : <Navigate to="/" />;
};

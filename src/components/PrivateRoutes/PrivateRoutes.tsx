import { getUserFromSession } from "../../utils/index";
import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoutes = () => {
  const auth = { token: getUserFromSession() };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

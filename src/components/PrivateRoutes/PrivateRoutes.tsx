import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoutes = () => {
  let getToken = localStorage.getItem("sb-behayaexitwnaavbinto-auth-token");
  getToken = getToken ? JSON.parse(getToken) : null;
  const auth = { token: getToken };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

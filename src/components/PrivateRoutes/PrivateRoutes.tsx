import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
export const PrivateRoutes = () => {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

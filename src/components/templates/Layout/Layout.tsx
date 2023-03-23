import { ReactNode, useEffect } from "react";
import { Header } from "components/orgnisms/Header/Header";
import { Footer } from "components/orgnisms/Footer/Footer";
import { LoginFormModal } from "components/orgnisms/LoginFormModal/LoginFormModal";
import { RegisterModalForm } from "components/orgnisms/RegisterFormModal/RegisterFormModal";
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  let user = sessionStorage.getItem("user");
  let parsedUser = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  //if user with token
  useEffect(() => {
    if (parsedUser?.session?.access_token) {
      navigate("/dashboard");
    }
  }, [user]);

  // to avoid flick
  if (parsedUser?.session?.access_token) {
    return null;
  }
  return (
    <div className="App">
      <Header />
      <div className="main">{children}</div>
      <Footer />
      <LoginFormModal />
      <RegisterModalForm />
    </div>
  );
};

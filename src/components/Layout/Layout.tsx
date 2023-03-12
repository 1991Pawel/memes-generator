import React, { ReactNode } from "react";
import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { RegisterForm } from "components/RegisterForm/RegisterForm.module";
import { LoginFormModal } from "components/LoginFormModal/LoginFormModal";
import { RegisterModalForm } from "components/RegisterFormModal/RegisterFormModal";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div className="main">{children}</div>
      <Footer />
      <LoginFormModal />
      <RegisterModalForm />
    </div>
  );
};

import React, { ReactNode } from "react";
import { HeaderSignIn } from "components/HeaderSignIn/HeaderSignIn";
import { Footer } from "components/Footer/Footer";

interface LayoutSignInProps {
  children: ReactNode;
}

export const LayoutSignIn = ({ children }: LayoutSignInProps) => {
  return (
    <div className="App">
      <HeaderSignIn />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};

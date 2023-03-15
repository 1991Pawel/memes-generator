import { ReactNode } from "react";
import { Button } from "components/Button/Button";
import { useNavigate } from "react-router-dom";

interface ButtonLogoutProps {
  children: ReactNode;
}

export const ButtonLogout = ({ children }: ButtonLogoutProps) => {
  const navigate = useNavigate();
  let tempLogoutFn = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Button onClick={() => tempLogoutFn()} color="secondary">
      {children}
    </Button>
  );
};

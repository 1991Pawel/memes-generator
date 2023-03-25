import { ReactNode } from "react";
import { Button } from "components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { removeUserFromSession } from "utils";

interface ButtonLogoutProps {
  children: ReactNode;
}

export const ButtonLogout = ({ children }: ButtonLogoutProps) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    removeUserFromSession();
    navigate("/", { replace: true });
  };
  return (
    <Button onClick={logout} color="secondary">
      {children}
    </Button>
  );
};

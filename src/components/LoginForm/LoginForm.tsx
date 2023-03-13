import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./LoginForm.module.css";
import { SyntheticEvent, useState } from "react";
import { loginUser } from "./index";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "components/Modal/ModalContext";
export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { handleError, handleCloseLoginForm } = useModalContext();

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser({ email, password, navigate, handleError, handleCloseLoginForm });
  };

  return (
    <form className={s.formWrapper}>
      <h2>Logowanie</h2>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Wpisz swój email..."
        label="Email"
        name="Email"
        value={email}
      />
      <Input
        placeholder="Wpisz hasło..."
        onChange={(e) => setPassword(e.target.value)}
        label="Hasło"
        name="Hasło"
        value={password}
      />
      <Button onClick={handleLogin}>Zaloguj</Button>
    </form>
  );
};

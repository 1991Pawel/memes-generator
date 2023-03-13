import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SyntheticEvent, useState } from "react";
import { PasswordStrengthBar } from "../PasswordStrengthBar/PasswordStrengthBar";
import s from "./RegisterForm.module.css";
import { registerUser } from "./index";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "components/Modal/ModalContext";

export const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { handleError } = useModalContext();

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser({ password, email, navigate, handleError, userName });
  };

  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
      <Input
        placeholder="Wpisz nazwę użytkownika..."
        onChange={(e) => setUserName(e.target.value)}
        label="Nazwa użytkownika"
        name="Nazwa użytkownika"
        value={userName}
      />

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

      <PasswordStrengthBar passwordValue={password} />
      <Button onClick={handleRegister}>Zarejestruj się</Button>
    </div>
  );
};

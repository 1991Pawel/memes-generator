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
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const { handleError } = useModalContext();

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser({ password, email, navigate, handleError, surname, name });
  };

  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
      <Input
        placeholder="Wpisz Imie..."
        onChange={(e) => setName(e.target.value)}
        label="Imie"
        name="Imie"
        value={name}
      />
      <Input
        placeholder="Wpisz Nazwisko..."
        onChange={(e) => setSurname(e.target.value)}
        label="Naziwsko"
        name="Naziwsko"
        value={surname}
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

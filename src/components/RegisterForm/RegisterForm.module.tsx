import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState } from "react";
import { PasswordStrengthBar } from "../PasswordStrengthBar/PasswordStrengthBar";
import s from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
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
      <Button>Zarejestruj się</Button>
    </div>
  );
};

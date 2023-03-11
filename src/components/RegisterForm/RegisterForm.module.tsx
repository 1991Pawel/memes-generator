import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState } from "react";
import { PasswordStrengthBar } from "../PasswordStrengthBar/PasswordStrengthBar";
import s from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const [password, setPassword] = useState("");
  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
      <Input label="Email" name="Email" />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        label="Hasło"
        name="Hasło"
        value={password}
      />
      <PasswordStrengthBar passwordValue={password} />
      <Button>Zaloguj</Button>
    </div>
  );
};

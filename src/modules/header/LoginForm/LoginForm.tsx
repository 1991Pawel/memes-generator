import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import s from "./LoginForm.module.css";
import { useState } from "react";

export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
      <Button>Zaloguj</Button>
    </form>
  );
};

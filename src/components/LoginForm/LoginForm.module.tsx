import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <div className={s.formWrapper}>
      <h2>Logowanie</h2>
      <Input label="Email" name="Email" />
      <Input label="Hasło" name="Hasło" />
      <Button>Zarejestruj się</Button>
    </div>
  );
};

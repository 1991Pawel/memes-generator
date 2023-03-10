import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./RegisterForm.module.css";

export const RegisterForm = () => {
  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
      <Input label="Email" name="Email" />
      <Input label="Hasło" name="Hasło" />
      <Button>Zaloguj</Button>
    </div>
  );
};

import s from "./Header.module.css";
import { Button } from "components/Button/Button";
import { LoginButton } from "../LogInButton/LoginButton";
export const Header = () => {
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <LoginButton />
        <Button>Zarejestruj się</Button>
      </div>
    </header>
  );
};

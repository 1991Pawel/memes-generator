import s from "./Header.module.css";
import { Button } from "components/Button/Button";
export const Header = () => {
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <Button color={"secondary"}>Zaloguj się</Button>
        <Button>Zarejestruj się</Button>
      </div>
    </header>
  );
};

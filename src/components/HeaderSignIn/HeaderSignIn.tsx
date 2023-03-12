import s from "./HeaderSignIn.module.css";
import { Button } from "components/Button/Button";

export const HeaderSignIn = () => {
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <Button onClick={() => console.log("wylogowanie")} color="secondary">
          Wyloguj się
        </Button>
      </div>
    </header>
  );
};

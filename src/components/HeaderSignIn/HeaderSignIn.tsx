import s from "./HeaderSignIn.module.css";

import { ButtonLogout } from "components/ButtonLogout/ButtonLogout";

export const HeaderSignIn = () => {
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <ButtonLogout>Wyloguj</ButtonLogout>
      </div>
    </header>
  );
};

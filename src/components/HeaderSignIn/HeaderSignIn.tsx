import s from "./HeaderSignIn.module.css";

import { ButtonLogout } from "components/ButtonLogout/ButtonLogout";
import { UserInfo } from "components/UserInfo/UserInfo";

export const HeaderSignIn = () => {
  return (
    <header className={s.header}>
      <div className={s.ctaGroup}>
        <UserInfo />
        <ButtonLogout>Wyloguj</ButtonLogout>
      </div>
    </header>
  );
};

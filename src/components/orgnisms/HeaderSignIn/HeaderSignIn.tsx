import s from "./HeaderSignIn.module.css";

import { ButtonLogout } from "components/molecules/ButtonLogout/ButtonLogout";
import { UserInfo } from "components/molecules/UserInfo/UserInfo";

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

import s from "./UserInfo.module.css";
import { getUserData } from "./index";
import { useEffect, useState } from "react";
export const UserInfo = () => {
  const userMetaDataJson = sessionStorage.getItem("user");
  const user = userMetaDataJson !== null ? JSON.parse(userMetaDataJson) : null;
  const name = user.user.user_metadata.user_name;
  const surname = user.user.user_metadata.user_surname;
  const avatarName =
    user.user.user_metadata.user_name[0] +
    user.user.user_metadata.user_surname[0];

  return (
    <div className={s.user}>
      <span className={s.name}>{avatarName}</span>
    </div>
  );
};

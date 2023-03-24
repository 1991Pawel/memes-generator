import s from "./UserInfo.module.css";
import { getUserFromSession } from "../../../utils";

export const UserInfo = () => {
  const user = getUserFromSession();
  const userName = user.user?.user_metadata?.user_username;
  const avatarName = userName
    ? userName[0] + userName[userName.length - 1]
    : "";

  return (
    <div className={s.user}>
      <span className={s.name}>{avatarName}</span>
    </div>
  );
};

import s from "./UserInfo.module.css";

export const UserInfo = () => {
  const userMetaDataJson = sessionStorage.getItem("user");
  const user = userMetaDataJson !== null ? JSON.parse(userMetaDataJson) : null;
  const userName = user.user.user_metadata.user_username;
  const avatarName = userName[0] + userName[userName.length - 1];

  return (
    <div className={s.user}>
      <span className={s.name}>{avatarName}</span>
    </div>
  );
};

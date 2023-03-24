import { Session, User } from "@supabase/gotrue-js";
interface UserData {
  user: User | null;
  session: Session | null;
}

export const getFileNameFromSrc = (fileName: string) =>
  fileName.substring(fileName.lastIndexOf("/") + 1);

export const saveUserToSession = (data: UserData) => {
  sessionStorage.setItem("user", JSON.stringify(data));
};
export const removeUserFromSession = () => sessionStorage.setItem("user", "");

export const getUserFromSession = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

import supabase from "config/supabaseClient";
import { Session, User, AuthError } from "@supabase/gotrue-js";
import { getFileNameFromSrc } from "../utils/index";
import { ErrorModalType } from "context/ModalContext";
export const fetchMems = async (
  onSuccess: (data: any) => void,
  onFailure: (error: any) => void
): Promise<void> => {
  const { data, error } = await supabase.from("mem").select();
  if (data) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

interface RemoveMemInterface {
  onSuccess: () => void;
  onFailure: () => void;
  mem: { img_src: string; id: string };
}

export const removeMem = async ({
  onSuccess,
  onFailure,
  mem,
}: RemoveMemInterface): Promise<void> => {
  Promise.all([removeFromTables(mem.id), removeFromStorage(mem.img_src)]).then(
    ([removeFormTables, removeFormStorage]) => {
      if (removeFormTables.error === null && removeFormStorage.error === null) {
        onSuccess();
      } else {
        onFailure();
      }
    }
  );
};

export const removeFromTables = async (id: string) => {
  return await supabase.from("mem").delete().match({ id });
};

const removeFromStorage = async (img_src: string) => {
  return await supabase.storage
    .from("mems")
    .remove([getFileNameFromSrc(img_src)]);
};

interface UserData {
  user: User | null;
  session: Session | null;
}

interface RegisterUserProps {
  userName: string;
  email: string;
  password: string;
  onFailure: (error: AuthError) => void;
  onSuccess: (data: UserData) => void;
}

export const registerUser = async ({
  userName,
  password,
  email,
  onSuccess,
  onFailure,
}: RegisterUserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_username: userName,
      },
    },
  });
  if (data.user) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

interface LoginUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
  handleError: (error: ErrorModalType) => void;
  handleCloseLoginForm: () => void;
  onSuccess: (data: UserData) => void;
  onFailure: (error: AuthError) => void;
}

export const loginUser = async ({
  password,
  email,
  onSuccess,
  onFailure,
}: LoginUserProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

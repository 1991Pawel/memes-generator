import supabase from "config/supabaseClient";
import { Session, User, AuthError } from "@supabase/gotrue-js";
import { getFileNameFromSrc } from "../utils/index";
import { ErrorModalType } from "context/ModalContext";
import { MemeType } from "context/MemesContext";
import { PostgrestError } from "@supabase/supabase-js";
interface FetchMemesInterface {
  onSuccess: (data: MemeType[] | any) => void;
  onFailure: (error: PostgrestError) => void;
}

export const fetchMemes = async ({
  onSuccess,
  onFailure,
}: FetchMemesInterface): Promise<void> => {
  const { data, error } = await supabase.from("meme").select();
  if (data) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

interface RemoveMemeInterface {
  onSuccess: () => void;
  onFailure: () => void;
  meme: { img_src: string; id: string };
}

export const removeMeme = async ({
  onSuccess,
  onFailure,
  meme,
}: RemoveMemeInterface): Promise<void> => {
  Promise.all([
    removeFromTables(meme.id),
    removeFromStorage(meme.img_src),
  ]).then(([removeFormTables, removeFormStorage]) => {
    if (removeFormTables.error === null && removeFormStorage.error === null) {
      onSuccess();
    } else {
      onFailure();
    }
  });
};

export const removeFromTables = async (id: string) => {
  return await supabase.from("meme").delete().match({ id });
};

const removeFromStorage = async (img_src: string) => {
  return await supabase.storage
    .from("memes")
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
  if (data.user) {
    onSuccess(data);
  }
  if (error) {
    onFailure(error);
  }
};

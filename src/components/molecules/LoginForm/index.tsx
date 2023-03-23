import supabase from "../../../config/supabaseClient";
import { ErrorModalType } from "context/ModalContext";

import { User, Session, AuthError } from "@supabase/supabase-js";

interface UserData {
  user: User | null;
  session: Session | null;
}
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

import supabase from "../../config/supabaseClient";
import { ErrorModalType } from "components/Modal/ModalContext";
import { Session, User } from "@supabase/gotrue-js";

interface LoginUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
  handleError: (error: ErrorModalType) => void;
  handleCloseLoginForm: () => void;
}

interface UserData {
  user: User | null;
  session: Session | null;
}

const saveUserToSession = (data: UserData) => {
  sessionStorage.setItem("user", JSON.stringify(data));
};

export const loginUser = async ({
  password,
  email,
  navigate,
  handleError,
  handleCloseLoginForm,
}: LoginUserProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data) {
    handleCloseLoginForm();
    saveUserToSession(data);
    navigate("/dashboard", { replace: true });
  }
  if (error) {
    handleError(error);
  }
};

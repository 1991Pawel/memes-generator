import supabase from "../../config/supabaseClient";
import { ErrorModalType } from "components/Modal/ModalContext";

interface loginUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
  handleError: (error: ErrorModalType) => void;
  handleCloseLoginForm: () => void;
}

export const loginUser = async ({
  password,
  email,
  navigate,
  handleError,
  handleCloseLoginForm,
}: loginUserProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data.user) {
    handleCloseLoginForm();
    navigate("/dashboard", { replace: true });
  }
  if (error) {
    handleError(error);
  }
};

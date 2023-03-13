import { NavigateFunction } from "react-router-dom";
import supabase from "../../config/supabaseClient";

interface RegisterUserProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
  handleError: (error: ErrorType) => void;
}

interface ErrorType {
  message: string;
  name: string;
}

export const registerUser = async ({
  password,
  email,
  navigate,
  handleError,
}: RegisterUserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (data.user) {
    navigate("/test", { replace: true });
  }
  if (error) {
    handleError(error);
  }
};

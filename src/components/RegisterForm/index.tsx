import { NavigateFunction } from "react-router-dom";
import supabase from "../../config/supabaseClient";

interface RegisterUserProps {
  userName: string;
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
  userName,
  password,
  email,
  navigate,
  handleError,
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
    navigate("/test", { replace: true });
  }
  if (error) {
    handleError(error);
  }
};

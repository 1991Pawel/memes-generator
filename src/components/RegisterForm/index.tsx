import { NavigateFunction } from "react-router-dom";
import supabase from "../../config/supabaseClient";

interface RegisterUserProps {
  userName: string;
  email: string;
  password: string;
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
    //zalogowany
  }
  if (error) {
    handleError(error);
  }
};

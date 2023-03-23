import { Session, User, AuthError } from "@supabase/gotrue-js";
import supabase from "../../../config/supabaseClient";

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

interface ErrorType {
  message: string;
  name: string;
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

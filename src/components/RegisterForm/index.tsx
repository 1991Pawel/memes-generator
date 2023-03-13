import supabase from "../../config/supabaseClient";

interface registerUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
  handleError: (error: any) => void;
}

export const registerUser = async ({
  password,
  email,
  navigate,
  handleError,
}: registerUserProps) => {
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

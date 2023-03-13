import supabase from "../../config/supabaseClient";

interface registerUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
}

export const registerUser = async ({
  password,
  email,
  navigate,
}: registerUserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (data.user) {
    navigate("/test", { replace: true });
  }
  if (error) {
    console.log(error, "ERROR");
  }
};

import supabase from "../../config/supabaseClient";
import { useModalContext } from "components/Modal/ModalContext";

interface loginUserProps {
  email: string;
  password: string;
  navigate: (a: string, b: { replace: boolean }) => void;
}

export const loginUser = async ({
  password,
  email,
  navigate,
}: loginUserProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data.user) {
    console.log(data, "user");
    navigate("/dashboard", { replace: true });
  }
  if (error) {
    // console.log(error, "errordsadas");
  }
};

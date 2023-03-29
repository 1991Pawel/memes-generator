import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import s from "./LoginForm.module.css";
import { loginUser } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  useModalContext } from "context/ModalContext";
import { Session, User, AuthError } from "@supabase/gotrue-js";
import { saveUserToSession } from "utils";

interface UserData {
  user: User | null;
  session: Session | null;
}

const schema = yup
  .object({
    email: yup.string().required("Wpisz email"),
    password: yup.string().required("Wpisz hasło"),
  })
  .required();

export type FormValues = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { handleCloseModal, modalTypeVariants, handleOpenModal } =
    useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSuccess = (data: UserData) => {
    handleCloseModal(modalTypeVariants.login);
    saveUserToSession(data);
    navigate("/dashboard", { replace: true });
  };
  const onFailure = (error: AuthError) => {
    handleOpenModal(modalTypeVariants.error, error);
  };

  const onSubmit = (data: FormValues) => {
    const { password, email } = data;
    loginUser({
      email,
      password,
      onSuccess,
      onFailure,
    });
  };

  return (
    <form className={s.formWrapper}>
      <h2>Logowanie</h2>

      <Input
        placeholder="Wpisz swój email..."
        label="Email"
        name="email"
        register={register}
        errors={errors}
      />

      <Input
        placeholder="Wpisz hasło..."
        label="Hasło"
        name="password"
        register={register}
        errors={errors}
      />

      <Button onClick={handleSubmit(onSubmit)}>Zaloguj</Button>
    </form>
  );
};

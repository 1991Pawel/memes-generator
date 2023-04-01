import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { PasswordStrengthBar } from "../../atoms/PasswordStrengthBar/PasswordStrengthBar";
import s from "./RegisterForm.module.css";
import { registerUser } from "../../../services";
import { useModalContext } from "context/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { Session, User, AuthError } from "@supabase/gotrue-js";
import { useEffect } from "react";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Wpisz nazwę użytkownika")
      .min(3, "nazwa użytkownika musi mieć co najmniej 3 znaki")
      .max(10, "nazwa użytkownika może mieć maksymalnie 10 znaków"),
    email: yup.string().email().required("Wpisz email"),
    password: yup
      .string()
      .required("Wpisz hasło")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną cyfrę i jedną znak specjalny"
      ),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export const RegisterForm = () => {
  const { modalState, handleCloseModal, modalTypeVariants, handleOpenModal } =
    useModalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  interface UserData {
    user: User | null;
    session: Session | null;
  }

  const onFailure = (error: AuthError) => {
    // handleOpenModal(modalTypeVariants.error, error);
  };
  const onSuccess = (data: UserData) => {
    handleCloseModal(modalTypeVariants.register);
    handleOpenModal(modalTypeVariants.registerSuccesfully);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { password, email, userName } = data;
    registerUser({ password, email, onFailure, onSuccess, userName });
  };

  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>

      <Input
        placeholder="Wpisz nazwę użytkownika..."
        label="Nazwa użytkownika"
        name="userName"
        register={register}
        error={errors["userName"]}
      />

      <Input
        placeholder="Wpisz swój email..."
        label="Email"
        name="email"
        register={register}
        error={errors["email"]}
      />

      <Input
        placeholder="Wpisz hasło..."
        label="Hasło"
        name="password"
        register={register}
        error={errors["password"]}
      />

      <PasswordStrengthBar passwordValue={watch("password")} />
      <Button onClick={handleSubmit(onSubmit)}>Zarejestruj się</Button>
    </div>
  );
};

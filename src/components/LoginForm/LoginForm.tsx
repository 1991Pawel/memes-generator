import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./LoginForm.module.css";
import { SyntheticEvent, useState } from "react";
import { loginUser } from "./index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useModalContext } from "components/Modal/ModalContext";
export const LoginForm = () => {
  const navigate = useNavigate();
  const { handleError, handleCloseLoginForm } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (e: any) => {
    e.preventDefault();
    // loginUser({ email, password, navigate, handleError, handleCloseLoginForm });
  };

  return (
    <form className={s.formWrapper}>
      <h2>Logowanie</h2>

      <Input
        placeholder="Wpisz swój email..."
        label="Email"
        name="email"
        register={register}
      />
      <Input
        placeholder="Wpisz hasło..."
        label="Hasło"
        name="password"
        register={register}
      />

      <Button onClick={handleSubmit(onSubmit)}>Zaloguj</Button>
    </form>
  );
};

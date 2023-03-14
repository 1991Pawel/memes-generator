import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { PasswordStrengthBar } from "../PasswordStrengthBar/PasswordStrengthBar";
import s from "./RegisterForm.module.css";
import { registerUser } from "./index";
import { useModalContext } from "components/Modal/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  password: string;
  email: string;
  userName: string;
}

export const RegisterForm = () => {
  const { handleError } = useModalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { password, email, userName } = data;
    registerUser({ password, email, handleError, userName });
  };

  return (
    <div className={s.formWrapper}>
      <h2>Rejestracja</h2>
      <Input
        placeholder="Wpisz nazwę użytkownika..."
        label="Nazwa użytkownika"
        name="userName"
        register={register}
      />
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

      <PasswordStrengthBar passwordValue={watch("password")} />
      <Button onClick={handleSubmit(onSubmit)}>Zarejestruj się</Button>
    </div>
  );
};

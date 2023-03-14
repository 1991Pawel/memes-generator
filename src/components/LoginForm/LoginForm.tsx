import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./LoginForm.module.css";
import { loginUser } from "./index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useModalContext } from "components/Modal/ModalContext";

const schema = yup
  .object({
    email: yup.string().required("Wpisz email"),
    password: yup.string().required("Wpisz hasło"),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { handleError, handleCloseLoginForm } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    const { password, email } = data;
    loginUser({ email, password, navigate, handleError, handleCloseLoginForm });
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

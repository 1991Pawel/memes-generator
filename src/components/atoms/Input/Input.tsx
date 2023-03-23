import { FieldErrors } from "react-hook-form";
import s from "./Input.module.css";

interface InputTypes {
  name: string;
  label: string;
  placeholder: string;
  register: any;
  errors: any;
}



export const Input = ({
  name,
  label,
  register,
  errors,
  ...rest
}: InputTypes) => {
  const withError = errors ? errors[`${name}`] : null;
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
      {withError && <span className={s.error}>{withError.message}</span>}
    </div>
  );
};

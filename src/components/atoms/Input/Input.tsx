import { FieldError,FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import s from "./Input.module.css";

interface InputTypes<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  ...rest
}: InputTypes<T>) => {
  const withError = errors ? errors[`${name}`] : null;
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
      {withError && <span className={s.error}>{withError?.message?.toString()}</span>}
    </div>
  );
};

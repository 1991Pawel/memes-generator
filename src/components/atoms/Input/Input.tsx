import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import s from "./Input.module.css";

interface InputTypes<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
}

export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  ...rest
}: InputTypes<T>) => {
  const withError = error ? error : null;
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
      {withError && <span className={s.error}>{withError?.message}</span>}
    </div>
  );
};

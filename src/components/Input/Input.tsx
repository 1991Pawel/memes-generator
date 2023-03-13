import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import s from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
}
export const Input = ({ name, label, register, ...rest }: InputProps) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
    </div>
  );
};

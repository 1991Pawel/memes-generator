import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import s from "./Input.module.css";

export const Input = ({ name, label, register, ...rest }: any) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
    </div>
  );
};

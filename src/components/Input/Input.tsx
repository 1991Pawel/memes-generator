import { UseFormRegister } from "react-hook-form";
import s from "./Input.module.css";

interface InputTypes {
  name: string;
  label: string;
  placeholder: string;
  register: any;
}

export const Input = ({ name, label, register, ...rest }: InputTypes) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...register(name)} className={s.input} {...rest}></input>
    </div>
  );
};

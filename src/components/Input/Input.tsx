import { InputHTMLAttributes } from "react";

import s from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
export const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label} htmlFor={name}>
        {label}
      </label>
      <input {...rest} className={s.input} id={name}></input>
    </div>
  );
};

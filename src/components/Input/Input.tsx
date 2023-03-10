import { InputHTMLAttributes } from "react";

import s from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
export const Input = ({ name, label, ...rest }: InputProps) => {
  {
    // console.log(s);
  }
  return (
    <div className={s.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input id={name}></input>
    </div>
  );
};

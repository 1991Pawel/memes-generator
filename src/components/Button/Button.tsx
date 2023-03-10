import React from "react";
import s from "./Button.module.css";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  return <button className={s.button} {...props} />;
};

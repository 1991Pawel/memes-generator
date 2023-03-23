import React from "react";
import s from "./Button.module.css";
import cx from "classnames";

const BTN_TYPE = {
  primary: s.primary,
  secondary: s.secondary,
};

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  color?: "primary" | "secondary";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={cx(
        s.button,
        props.color ? BTN_TYPE[props.color] : BTN_TYPE.primary
      )}
      {...props}
    />
  );
};

import s from "./PasswordStrengthBar.module.css";
import cx from "classnames";

interface PasswordStrengthBarProps {
  passwordValue: string;
}

const passwordType = {
  weak: { message: "Słabe", color: "red", barNumber: 1 },
  medium: { message: "Średnie", color: "#FFC72C", barNumber: 3 },
  strong: { message: "Śilne", color: "#00AB66", barNumber: 4 },
};

export const PasswordStrengthBar = ({
  passwordValue = "",
}: PasswordStrengthBarProps) => {
  const strengthChecks = {
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasDigit: false,
    hasSpecialChar: false,
  };

  //rules
  strengthChecks.length = passwordValue.length >= 8;
  strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
  strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
  strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
  strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

  const verifiedList = Object.values(strengthChecks).filter((value) => value);

  const getCurrentStrength = () => {
    if (verifiedList.length === 5) return passwordType.strong;
    if (verifiedList.length >= 2) return passwordType.medium;
    return passwordType.weak;
  };
  const currentStrength = getCurrentStrength();
  const barNumber = new Array(4).fill(false);

  return (
    <div className={cx(s.barWrapper, passwordValue.length ? s.active : null)}>
      {barNumber.map((_, i) => {
        return (
          <span
            className={s.bar}
            style={{
              background:
                currentStrength.barNumber > i ? currentStrength.color : "",
            }}
            key={i}
          ></span>
        );
      })}

      <p className={s.desc}>{currentStrength.message}</p>
    </div>
  );
};

import s from "./Header.module.css";
import { Button } from "components/atoms/Button/Button";
import { useModalContext } from "context/ModalContext";
export const Header = () => {
  const { handleOpenLoginForm, handleOpenRegisterForm } = useModalContext();
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <Button onClick={handleOpenRegisterForm}>Zarejestruj się</Button>
        <Button onClick={handleOpenLoginForm} color="secondary">
          Zaloguj się
        </Button>
      </div>
    </header>
  );
};

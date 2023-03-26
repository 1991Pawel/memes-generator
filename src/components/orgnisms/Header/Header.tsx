import s from "./Header.module.css";
import { Button } from "components/atoms/Button/Button";
import { useModalContext } from "context/ModalContext";
export const Header = () => {
  const { handleOpenLoginForm, handleOpenModal, modalTypeVariants } =
    useModalContext();
  return (
    <header className={s.header}>
      <p>Header</p>
      <div className={s.ctaGroup}>
        <Button onClick={() => handleOpenModal(modalTypeVariants.register)}>
          Zarejestruj się
        </Button>
        <Button
          onClick={() => handleOpenModal(modalTypeVariants.login)}
          color="secondary"
        >
          Zaloguj się
        </Button>
      </div>
    </header>
  );
};

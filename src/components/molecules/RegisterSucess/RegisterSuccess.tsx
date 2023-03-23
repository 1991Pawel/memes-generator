import s from "./RegisterSucess.module.css";
import { Button } from "components/atoms/Button/Button";
import { useModalContext } from "context/ModalContext";

interface RegisterSucessProps {
  handleCloseRegisterSucessfuly: () => void;
}

export const RegisterSuccess = ({
  handleCloseRegisterSucessfuly,
}: RegisterSucessProps) => {
  const { handleOpenLoginForm } = useModalContext();

  const handleClick = () => {
    handleCloseRegisterSucessfuly();
    handleOpenLoginForm();
  };

  return (
    <div className={s.container}>
      <h2>Konto zostało utworzone pomyślnie</h2>
      <p>możesz teraz się zalogować</p>
      <Button onClick={handleClick}>Zaloguj Się</Button>
    </div>
  );
};

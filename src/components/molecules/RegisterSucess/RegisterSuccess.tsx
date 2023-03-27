import s from "./RegisterSucess.module.css";
import { Button } from "components/atoms/Button/Button";
import { useModalContext } from "context/ModalContext";



export const RegisterSuccess = () => {
  const { handleOpenModal,handleCloseModal,modalTypeVariants } = useModalContext();

  const handleClick = () => {
    handleCloseModal(modalTypeVariants.registerSuccesfully);
    handleOpenModal(modalTypeVariants.login)
  };

  return (
    <div className={s.container}>
      <h2>Konto zostało utworzone pomyślnie</h2>
      <p>możesz teraz się zalogować</p>
      <Button onClick={handleClick}>Zaloguj Się</Button>
    </div>
  );
};

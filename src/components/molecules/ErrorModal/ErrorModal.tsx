import { Modal } from "components/atoms/Modal/Modal";
import { useModalContext } from "context/ModalContext";
import s from "./ErrorModal.module.css";
import { Button } from "components/atoms/Button/Button";

export const ErrorModal = () => {
  const { isOpenErrorModal, handleCloseErrorModal, error } = useModalContext();

  const { message, name } = error;
  return (
    <Modal isOpen={isOpenErrorModal} onClose={handleCloseErrorModal}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.title}>{name}</h2>
          <p className={s.desc}>{message}</p>
        </div>
        <Button color="primary" onClick={handleCloseErrorModal}>
          Zamknij
        </Button>
      </div>
    </Modal>
  );
};

import { Modal } from "components/atoms/Modal/Modal";
import { modalTypeVariants, useModalContext } from "context/ModalContext";
import s from "./ErrorModal.module.css";
import { Button } from "components/atoms/Button/Button";

export const ErrorModal = () => {
  const { modalState, handleCloseModal } = useModalContext();

  return (
    <Modal
      isOpen={modalState.error.isOpen}
      onClose={() => handleCloseModal(modalTypeVariants.error)}
    >
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.title}>{modalState.error?.errorType?.name}</h2>
          <p className={s.desc}>{modalState.error?.errorType?.status}</p>
        </div>
        <Button
          color="primary"
          onClick={() => handleCloseModal(modalTypeVariants.error)}
        >
          Zamknij
        </Button>
      </div>
    </Modal>
  );
};

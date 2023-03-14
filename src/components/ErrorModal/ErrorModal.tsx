import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { useModalContext } from "components/Modal/ModalContext";
import s from "./ErrorModal.module.css";
import { Button } from "components/Button/Button";

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
          {" "}
          Zamknij
        </Button>
      </div>
    </Modal>
  );
};

import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { useModalContext } from "components/Modal/ModalContext";
import s from "./ErrorModal.module.css";

export const ErrorModal = () => {
  const { isOpenErrorModal, handleCloseErrorModal, error } = useModalContext();

  const { message, name } = error;
  return (
    <Modal isOpen={isOpenErrorModal} onClose={handleCloseErrorModal}>
      <div className={s.inner}>
        <div className={s.content}>
          <h2 className={s.title}>
            Ups... <p>{name}</p>
          </h2>
          <p className={s.desc}>{message}</p>
        </div>
        <button className={s.btn} onClick={handleCloseErrorModal}>
          Zamknij
        </button>
      </div>
    </Modal>
  );
};

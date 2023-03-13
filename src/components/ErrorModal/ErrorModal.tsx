import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { useModalContext } from "components/Modal/ModalContext";

// export const RegisterModalForm = () => {
//   const { isOpenRegisterForm, handleCloseRegisterForm } = useModalContext();
// interface ErrorModalTypes {
//   isOpen: boolean;
//   handleCloseModal: () => void;
//   error: any;
// }

export const ErrorModal = () => {
  const { isOpenErrorModal, handleCloseErrorModal } = useModalContext();
  return (
    <Modal isOpen={isOpenErrorModal} onClose={handleCloseErrorModal}>
      <div>
        <button onClick={() => handleCloseErrorModal}>Zamknij</button>
        <h2>Ups...</h2>
        <p>Coś poszlo nie tak</p>
      </div>
    </Modal>
  );
};

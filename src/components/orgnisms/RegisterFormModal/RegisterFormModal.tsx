import { useState } from "react";
import { Modal } from "components/atoms/Modal/Modal";
import { RegisterForm } from "components/molecules/RegisterForm/RegisterForm.module";
import { useModalContext } from "context/ModalContext";
import { RegisterSuccess } from "components/molecules/RegisterSucess/RegisterSuccess";

export const RegisterModalForm = () => {
  const {

    modalState,
    modalTypeVariants,
    handleCloseModal,
  } = useModalContext();


  return (
    <>
      <Modal
        isOpen={modalState.register.isOpen}
        onClose={() => handleCloseModal(modalTypeVariants.register)}
      >
        <RegisterForm />
      </Modal>

      <Modal
        isOpen={modalState.registerSuccesfully.isOpen}
        onClose={() => handleCloseModal(modalTypeVariants.registerSuccesfully)}
      >
        <RegisterSuccess
        />
      </Modal>
    </>
  );
};

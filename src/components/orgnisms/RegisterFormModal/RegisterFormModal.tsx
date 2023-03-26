import { useState } from "react";
import { Modal } from "components/atoms/Modal/Modal";
import { RegisterForm } from "components/molecules/RegisterForm/RegisterForm.module";
import { useModalContext } from "context/ModalContext";
import { RegisterSuccess } from "components/molecules/RegisterSucess/RegisterSuccess";

export const RegisterModalForm = () => {
  const [registerSuccesfully, setRegisterSucessfully] = useState(false);
  const {
    isOpenRegisterForm,
    handleCloseRegisterForm,
    modalState,
    modalTypeVariants,
    handleCloseModal,
  } = useModalContext();

  const handleRegisterSucessfuly = () => {
    setRegisterSucessfully(true);
  };
  const handleCloseRegisterSucessfuly = () => {
    setRegisterSucessfully(false);
  };

  return (
    <>
      <Modal
        isOpen={modalState.register.isOpen}
        onClose={() => handleCloseModal(modalTypeVariants.register)}
      >
        <RegisterForm handleRegisterSucessfuly={handleRegisterSucessfuly} />
      </Modal>
      <Modal
        isOpen={modalState.registerSuccesfully.isOpen}
        onClose={() => handleCloseModal(modalTypeVariants.registerSuccesfully)}
      >
        <RegisterSuccess
          handleCloseRegisterSucessfuly={() =>
            handleCloseModal(modalTypeVariants.registerSuccesfully)
          }
        />
      </Modal>
    </>
  );
};

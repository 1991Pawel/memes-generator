import { useState } from "react";
import { Modal } from "components/atoms/Modal/Modal";
import { RegisterForm } from "components/molecules/RegisterForm/RegisterForm.module";
import { useModalContext } from "context/ModalContext";
import { RegisterSuccess } from "components/molecules/RegisterSucess/RegisterSuccess";

export const RegisterModalForm = () => {
  const [registerSuccesfully, setRegisterSucessfully] = useState(false);
  const { isOpenRegisterForm, handleCloseRegisterForm } = useModalContext();

  const handleRegisterSucessfuly = () => {
    setRegisterSucessfully(true);
  };
  const handleCloseRegisterSucessfuly = () => {
    setRegisterSucessfully(false);
  };

  return (
    <>
      <Modal isOpen={isOpenRegisterForm} onClose={handleCloseRegisterForm}>
        <RegisterForm handleRegisterSucessfuly={handleRegisterSucessfuly} />
      </Modal>
      <Modal
        isOpen={registerSuccesfully}
        onClose={handleCloseRegisterSucessfuly}
      >
        <RegisterSuccess
          handleCloseRegisterSucessfuly={handleCloseRegisterSucessfuly}
        />
      </Modal>
    </>
  );
};

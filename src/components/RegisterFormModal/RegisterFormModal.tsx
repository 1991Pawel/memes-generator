import { Modal } from "components/Modal/Modal";
import { RegisterForm } from "components/RegisterForm/RegisterForm.module";
import { useModalContext } from "components/Modal/ModalContext";

export const RegisterModalForm = () => {
  const { isOpenRegisterForm, handleCloseRegisterForm } = useModalContext();
  return (
    <Modal isOpen={isOpenRegisterForm} onClose={handleCloseRegisterForm}>
      <RegisterForm />
    </Modal>
  );
};

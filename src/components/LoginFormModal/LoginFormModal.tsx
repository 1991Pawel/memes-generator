import { Modal } from "components/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { useModalContext } from "components/Modal/ModalContext";

export const LoginFormModal = () => {
  const { handleCloseLoginForm, isOpenLoginForm } = useModalContext();

  return (
    <Modal isOpen={isOpenLoginForm} onClose={handleCloseLoginForm}>
      <LoginForm />
    </Modal>
  );
};

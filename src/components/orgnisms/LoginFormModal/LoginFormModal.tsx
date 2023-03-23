import { Modal } from "components/atoms/Modal/Modal";
import { LoginForm } from "../../molecules/LoginForm/LoginForm";
import { useModalContext } from "context/ModalContext";

export const LoginFormModal = () => {
  const { handleCloseLoginForm, isOpenLoginForm } = useModalContext();

  return (
    <Modal isOpen={isOpenLoginForm} onClose={handleCloseLoginForm}>
      <LoginForm />
    </Modal>
  );
};

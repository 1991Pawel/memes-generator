import { Modal } from "components/atoms/Modal/Modal";
import { LoginForm } from "../../molecules/LoginForm/LoginForm";
import { useModalContext } from "context/ModalContext";

export const LoginFormModal = () => {
  const { modalTypeVariants, modalState, handleCloseModal } = useModalContext();

  return (
    <Modal
      isOpen={modalState.login.isOpen}
      onClose={() => handleCloseModal(modalTypeVariants.login)}
    >
      <LoginForm />
    </Modal>
  );
};

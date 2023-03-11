import { DefaultModalProps, Modal } from "components/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";

type LoginFormModalProps = {} & DefaultModalProps;

export const LoginFormModal = ({ onClose, isOpen }: LoginFormModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </Modal>
  );
};

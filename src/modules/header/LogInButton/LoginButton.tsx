import { Button } from "components/Button/Button";
import { LoginFormModal } from "../LoginFormModal/LoginFormModal";
import { useLoginButton } from "./useLoginButton";

export const LoginButton = () => {
  const { isModalOpen, handleModalClose, handleModalOpen } = useLoginButton();
  return (
    <>
      <Button color={"secondary"} onClick={handleModalOpen}>
        Zaloguj się
      </Button>
      <LoginFormModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

import { ReactNode } from "react";
import { Modal } from "components/Modal/Modal";
import { useModalContext } from "components/Modal/ModalContext";
import s from "./ErrorModal.module.css";
import { Button } from "components/Button/Button";

export const InfoModal = () => {
  return (
    <Modal isOpen={true} onClose={() => console.log("test")}>
      <div>Lorem ipsum dolor sit amet.</div>
    </Modal>
  );
};

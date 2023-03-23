import { ReactNode } from "react";
import { Modal } from "components/atoms/Modal/Modal";
import { useModalContext } from "context/ModalContext";
import s from "./ErrorModal.module.css";
import { Button } from "components/atoms/Button/Button";

export const InfoModal = () => {
  return (
    <Modal isOpen={true} onClose={() => console.log("test")}>
      <div>Lorem ipsum dolor sit amet.</div>
    </Modal>
  );
};

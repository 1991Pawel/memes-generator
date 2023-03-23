import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import s from "./Modal.module.css";
import cx from "classnames";

interface ModalProps extends DefaultModalProps {
  children: ReactNode;
}

export interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div className={cx(isOpen ? s.overlay : null)}>
      <Dialog className={s.modal} open={isOpen} onClose={onClose}>
        {children}
      </Dialog>
    </div>
  );
};

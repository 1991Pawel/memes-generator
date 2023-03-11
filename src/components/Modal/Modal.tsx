import { ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";
import s from "./Modal.module.css";
import cx from "classnames";

interface ModalProps {
  children: ReactNode;
  isOpen: any;
  setIsOpen: any;
}

export const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  // let [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cx(isOpen ? s.overlay : null)}>
      <Dialog
        className={s.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Dialog>
    </div>
  );
};

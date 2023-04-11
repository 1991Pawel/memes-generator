import { createContext, useState, ReactNode } from "react";
import { useContext } from "react";

interface ModalContextProviderProps {
  children: ReactNode;
}

export interface ErrorModalType {
  name: string;
  message: string;
}

interface ModalState {
  modalState: any;
  handleOpenModal: (modalType: string, payload?: object | undefined) => void;
  handleCloseModal: (modalType: string) => void;
  modalTypeVariants: { [key: string]: string };
}

export const modalTypeVariants = {
  login: "login",
  register: "register",
  registerSuccesfully: "registerSuccesfully",
  error: "error",
};

export const ModalContext = createContext<ModalState | null>(null);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modalState, setModalState] = useState({
    register: {
      isOpen: false,
    },
    registerSuccesfully: {
      isOpen: false,
    },
    login: {
      isOpen: false,
    },
    error: {
      isOpen: false,
    },
  });

  const handleOpenModal = (modalType: string, payload: object | undefined) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: {
        isOpen: true,
        errorType: { ...payload },
      },
    }));
  };

  const handleCloseModal = (modalType: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: {
        isOpen: false,
      },
    }));
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        handleOpenModal,
        handleCloseModal,
        modalTypeVariants,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("You forgot ModalContext Provider");
  }
  return ctx;
};

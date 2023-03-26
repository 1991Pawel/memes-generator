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
  isOpenLoginForm: boolean;
  modalState: any;
  handleOpenLoginForm: () => void;
  handleCloseLoginForm: () => void;
  isOpenRegisterForm: boolean;
  handleOpenRegisterForm: () => void;
  handleCloseRegisterForm: () => void;
  isOpenErrorModal: boolean;
  handleCloseErrorModal: () => void;
  handleOpenErrorModal: () => void;
  handleError: (error: ErrorModalType) => void;
  error: ErrorModalType;
  handleOpenModal: (modalType: string, payload?: any) => void;
  handleCloseModal: (modalType: string) => void;
  modalTypeVariants: any;
}

export const modalTypeVariants = {
  login: "login",
  register: "register",
  registerSuccesfully: "registerSuccesfully",
};

export const ModalContext = createContext<ModalState | null>(null);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [error, setError] = useState({ message: "", name: "" });

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
  });

  const handleOpenModal = (modalType: string, payload: any) => {
    setModalState({
      ...modalState,
      [modalType]: {
        isOpen: true,
        ...payload,
      },
    });
  };

  const handleCloseModal = (modalType: string) => {
    setModalState({
      ...modalState,
      [modalType]: {
        isOpen: false,
      },
    });
  };

  const handleOpenLoginForm = () => {
    setIsOpenLoginForm(true);
  };
  const handleCloseLoginForm = () => {
    setIsOpenLoginForm(false);
  };

  const handleOpenRegisterForm = () => {
    setIsOpenRegisterForm(true);
  };
  const handleCloseRegisterForm = () => {
    setIsOpenRegisterForm(false);
  };

  const handleOpenErrorModal = () => {
    setIsOpenErrorModal(true);
  };
  const handleCloseErrorModal = () => {
    setIsOpenErrorModal(false);
  };
  const handleError = (error: ErrorModalType) => {
    handleOpenErrorModal();
    setError(error);
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        handleOpenModal,
        handleCloseModal,
        modalTypeVariants,
        isOpenLoginForm,
        handleOpenLoginForm,
        handleCloseLoginForm,
        isOpenRegisterForm,
        handleOpenRegisterForm,
        handleCloseRegisterForm,
        isOpenErrorModal,
        handleOpenErrorModal,
        handleCloseErrorModal,
        handleError,
        error,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return ctx;
};

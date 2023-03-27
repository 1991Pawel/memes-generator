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

  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [error, setError] = useState({ message: "", name: "" });

  const [modalState, setModalState] = useState({
    register: {
      isOpen: false,
    },
    registerSuccesfully: {
      isOpen:false,
    },
    login: {
      isOpen: false,
    },
  });

  const handleOpenModal = (modalType: string, payload: any) => {
    setModalState((prevState) => ({
        ...prevState,
        [modalType]: {
          isOpen: true,
          ...payload,
        },
      
    }));
  };

  const handleCloseModal = (modalType: string) => {
    setModalState((prevState) => ({
        ...prevState,
        [modalType]: {
          isOpen: false,
        },
    }))
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

import { createContext, useState, ReactNode } from "react";
import { useContext } from "react";

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalState {
  isOpenLoginForm: boolean;
  handleOpenLoginForm: () => void;
  handleCloseLoginForm: () => void;
  isOpenRegisterForm: boolean;
  handleOpenRegisterForm: () => void;
  handleCloseRegisterForm: () => void;
  isOpenErrorModal: boolean;
  handleCloseErrorModal: () => void;
  handleOpenErrorModal: () => void;
  handleError: (error: any) => void;
  error: any;
}

export const ModalContext = createContext<ModalState | null>(null);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [error, setError] = useState({});

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
  const handleError = (error: any) => {
    handleOpenErrorModal();
    setError(error);
  };

  return (
    <ModalContext.Provider
      value={{
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

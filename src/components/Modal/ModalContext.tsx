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
}

export const ModalContext = createContext<ModalState | null>(null);

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

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

  return (
    <ModalContext.Provider
      value={{
        isOpenLoginForm,
        handleOpenLoginForm,
        handleCloseLoginForm,
        isOpenRegisterForm,
        handleOpenRegisterForm,
        handleCloseRegisterForm,
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

import { useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./modules/header/Header/Header";
import { LoginFormModal } from "components/LoginFormModal/LoginFormModal";
import { RegisterModalForm } from "components/RegisterFormModal/RegisterFormModal";
import { ModalContextProvider } from "components/Modal/ModalContext";
function App() {
  return (
    <ModalContextProvider>
      <div className="App">
        <Header />
        <main className="main">Lorem ipsum dolor sit amet.</main>
        <Footer />
        <LoginFormModal />
        <RegisterModalForm />
      </div>
    </ModalContextProvider>
  );
}

export default App;

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import s from "./LoginForm.module.css";
import { useState } from "react";
import { Modal } from "components/Modal/Modal";

export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={s.formWrapper}>
        <h2>Logowanie</h2>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Wpisz swój email..."
          label="Email"
          name="Email"
          value={email}
        />
        <Input
          placeholder="Wpisz hasło..."
          onChange={(e) => setPassword(e.target.value)}
          label="Hasło"
          name="Hasło"
          value={password}
        />
        <Button>Zaloguj</Button>
      </div>
    </Modal>
  );
};

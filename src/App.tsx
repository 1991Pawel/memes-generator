import { Footer } from "./components/Footer/Footer";

import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { LoginForm } from "components/LoginForm/LoginForm.module";

function App() {
  return (
    <div className="App">
      <Header />
      <LoginForm />
      <main className="main">Lorem ipsum dolor sit amet.</main>
      <Footer />
    </div>
  );
}

export default App;

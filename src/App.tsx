import { Footer } from "./components/Footer/Footer";
import { RegisterForm } from "./components/RegisterForm/RegisterForm.module";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <RegisterForm />
      {/* <Input label="Email" name="Email" />
      <Input label="Hasło" name="Hasło" />
      <Button>Zaloguj</Button> */}
      <Footer />
    </div>
  );
}

export default App;

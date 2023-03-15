import { ModalContextProvider } from "components/Modal/ModalContext";
import { PrivateRoutes } from "components/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "pages/Dashboard";
import { ErrorModal } from "components/ErrorModal/ErrorModal";
function App() {
  return (
    <ModalContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard />} path="/dashboard"></Route>
            </Route>
          </Routes>
        </Router>
        <ErrorModal />
      </div>
    </ModalContextProvider>
  );
}

export default App;

import { ModalContextProvider } from "context/ModalContext";
import { MemesContextProvider } from "context/MemesContext";
import { PrivateRoutes } from "components/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "pages/Dashboard";
import { ErrorModal } from "components/molecules/ErrorModal/ErrorModal";
function App() {
  return (
    <ModalContextProvider>
      <MemesContextProvider>
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
      </MemesContextProvider>
    </ModalContextProvider>
  );
}

export default App;

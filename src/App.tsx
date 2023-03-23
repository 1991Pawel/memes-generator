import { ModalContextProvider } from "context/ModalContext";
import { MemContextProvider } from "context/MemsContext";
import { PrivateRoutes } from "components/PrivateRoutes/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "pages/Dashboard";
import { ErrorModal } from "components/molecules/ErrorModal/ErrorModal";
function App() {
  return (
    <ModalContextProvider>
      <MemContextProvider>
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
      </MemContextProvider>
    </ModalContextProvider>
  );
}

export default App;

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "./App.css";
import LoginPage from './pages/LoginPage'
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './utils/PrivateRoute';






function App() {
 
return (
  <div className="App">
    <Router>
      <Routes>
        {/* <PrivateRoute component={Dashboard} path="/dashboard" exact /> */}\
        <Route element={<PrivateRoute/>}>
          <Route element={<Dashboard/>} exact path="/dashboard"></Route>
        </Route>
        <Route element={<LoginPage/>} path="/"/>
      </Routes>
    </Router>
  </div>
)
}

export default App;

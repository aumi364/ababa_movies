import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  
  function PrivateRoute({ children }: any) {
    const isLoggedIn = localStorage.getItem("token");
    return isLoggedIn ? children : <Navigate to={"/"} />;
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route key="login" path="/" element={<Login />} />
          <Route
            path={"home"}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

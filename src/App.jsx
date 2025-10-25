import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import AuthForm from "./components/AuthForm";
import Header from "./components/Top";
import Main from "./components/Center";
import Timeline from "./components/Outline";
import Points from "./components/Display";
import Prod from "./components/Verified";
import Footer from "./components/Bottom";
import WalletConnect from "./components/WalletConnect"; // new component

function App() {
  const [accountId, setAccountId] = useState(null);
  const [greenPoints, setGreenPoints] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <AuthForm onAuthComplete={() => setIsAuthenticated(true)} />
            ) : (
              <LandingPage
                onWalletConnect={(id) => {
                  setAccountId(id);
                  setGreenPoints(2450);
                }}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard accountId={accountId} greenPoints={greenPoints} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

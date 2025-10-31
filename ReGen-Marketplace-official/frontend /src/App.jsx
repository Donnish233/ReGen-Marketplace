import './App.css'
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyProducts from "./pages/MyProducts";
import Recycle from "./pages/Recycle";
import Rewards from "./pages/Rewards";
import Sell from "./pages/Sell";
import Settings from "./pages/Settings";

function App() {
  const [auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleWalletConnect = (walletInfo) => {
    setWallet(walletInfo);
    setCurrentPage("dashboard");
  };

  // If not authenticated, show auth form
  if (!auth) {
    return <AuthForm onAuthComplete={() => setAuth(true)} />;
  }

  // If authenticated but no wallet, show landing page
  if (!wallet) {
    return <Landing onWalletConnect={handleWalletConnect} />;
  }

  // Once wallet is connected, show the appropriate page
  const pages = {
    dashboard: <Dashboard wallet={wallet} onNavigate={setCurrentPage} />,
    "my-products": <MyProducts onNavigate={setCurrentPage} />,
    recycle: <Recycle onNavigate={setCurrentPage} />,
    rewards: <Rewards onNavigate={setCurrentPage} />,
    sell: <Sell onNavigate={setCurrentPage} />,
    settings: <Settings onNavigate={setCurrentPage} />,
  };

  return pages[currentPage] || pages.dashboard;
}

export default App

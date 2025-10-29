import { useState } from "react";
import AuthForm from "./pages/AuthForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState(null);

  const handleAuthSuccess = () => setAuth(true);
  const handleWalletConnect = (walletInfo) => setWallet(walletInfo);

  if (!auth) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  if (!wallet) {
    return <Landing onWalletConnect={handleWalletConnect} />;
  }

  return <Dashboard wallet={wallet} />;
}

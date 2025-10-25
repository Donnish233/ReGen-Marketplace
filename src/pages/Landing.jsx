import { useNavigate } from "react-router-dom";
import Header from "../components/Top";
import Main from "../components/Center";
import Timeline from "../components/Outline";
import Points from "../components/Display";
import Prod from "../components/Verified";
import Footer from "../components/Bottom";
import WalletConnect from "../components/WalletConnect";

export default function LandingPage({ onWalletConnect }) {
  const navigate = useNavigate();

  const handleConnect = (walletId) => {
    onWalletConnect(walletId);
    navigate("/dashboard");
  };

  return (
    <div className="overflow-x-hidden">
      <Header />
      <Main />
      <Timeline />
      <Points />
      <Prod />
      <WalletConnect onConnect={handleConnect} />
      <Footer />
    </div>
  );
}

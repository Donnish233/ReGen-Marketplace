import WalletConnect from "../components/WalletConnect";
import Footer from "../components/Footer";
import Centre from "../components/Centre";

function Header({ onWalletConnect }) {
  const handleWalletConnect = (walletInfo) => {
    if (onWalletConnect) onWalletConnect(walletInfo);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#F6F8F5] h-16 px-4 sm:px-8 flex items-center justify-between z-50 overflow-x-hidden">
      <div className="flex items-center gap-2 sm:gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            fill="#22c55e"
            d="M16 2L4 8v8c0 7.5 5.2 14.5 12 16 6.8-1.5 12-8.5 12-16V8L16 2z"
          />
          <path
            fill="#fff"
            d="M16 6L8 10v6c0 5 3.5 9.7 8 10.7 4.5-1 8-5.7 8-10.7v-6l-8-4z"
          />
        </svg>
        <h3 className="text-base sm:text-lg font-semibold">
          ReGen Marketplace
        </h3>
      </div>

      <WalletConnect onConnect={handleWalletConnect} />
    </header>
  );
}

export default function Landing({ onWalletConnect }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header onWalletConnect={onWalletConnect} />
      <Centre />
      <Footer />
    </div>
  );
}

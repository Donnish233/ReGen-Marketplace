import WalletConnect from "./WalletConnect";

export default function Header() {

  const handleWalletConnect = (accountId) => {
    console.log("Connected account:", accountId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#F6F8F5] h-16 px-4 sm:px-8 flex items-center justify-between z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <img src="/images/green logo.jpg" alt="logo" className="w-6 h-auto" />
        <h3 className="text-base sm:text-lg font-semibold">
          ReGen Marketplace
        </h3>
      </div>
      <WalletConnect onConnect={handleWalletConnect} />
    </header>
  );
}

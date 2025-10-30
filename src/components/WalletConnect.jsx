export default function WalletConnect({ onConnect }) {
  const connectWallet = () => {
    const fakeWallet = {
      id: "0.0.12345",
      balance: 100,
      network: "testnet",
    };
    onConnect(fakeWallet);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={connectWallet}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Connect Hedera Wallet
      </button>
    </div>
  );
}

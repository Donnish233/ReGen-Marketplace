export function Foot() {
  const links = ["About", "Rewards", "Contact", "Privacy Policy"];

  return (
    <footer className="mt-auto border-t border-gray-200 py-6 text-center px-4">
      <div className="flex justify-center gap-4 sm:gap-6 mb-3 text-sm text-gray-500 flex-wrap">
        {links.map((link) => (
          <a key={link} href="#" className="hover:text-green-500 transition">
            {link}
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400">
        Built on Hedera · Powered by IPFS · © 2024 ReGen Marketplace.
      </p>
    </footer>
  );
}

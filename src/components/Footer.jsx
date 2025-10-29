export default function Footer() {
  const pages = ["About", "Rewards", "FAQ", "Contact"];
  return (
    <footer className="bg-none p-5 mt-10 border-t border-t-green-100">
      <nav>
        <ul className="hidden md:flex gap-14 text-gray-700 font-medium">
          {pages.map((item) => (
            <li key={item} className="cursor-pointer transition">
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-green-300">
        Built on Hedera  Powered by IPFS  &copy;Regen Marketplace
      </div>
    </footer>
  );
}

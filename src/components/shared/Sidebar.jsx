import { Icon } from "@iconify/react";
import { Logo } from "./Logo";

export function Sidebar({ activePage = "Dashboard", onNavigate }) {
  const navItems = [
    { name: "Dashboard", icon: "mdi:view-dashboard", page: "dashboard" },
    { name: "My Products", icon: "mdi:package-variant", page: "my-products" },
    { name: "Sell", icon: "mdi:cart", page: "sell" },
    { name: "Recycle", icon: "mdi:recycle", page: "recycle" },
    { name: "Rewards", icon: "mdi:trophy", page: "rewards" },
    { name: "Settings", icon: "mdi:cog", page: "settings" },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 bg-white border-r border-gray-200 flex-col p-4 hidden lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-2 mb-8">
        <Logo />
        <h2 className="text-xl font-bold text-gray-900">ReGen</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onNavigate?.(item.page)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition text-left ${
              activePage === item.name
                ? "bg-green-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon icon={item.icon} width="20" height="20" />
            {item.name}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm">
          JD
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">Jane Doe</div>
          <div className="text-xs text-gray-500">Eco-Warrior</div>
        </div>
      </div>
    </aside>
  );
}

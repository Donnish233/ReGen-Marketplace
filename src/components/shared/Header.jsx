import { Icon } from "@iconify/react";

export function Header({ greenPoints = 2450 }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-10 py-3">
        {/* Search Bar */}
        <div className="flex-1 min-w-[200px] max-w-lg flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
          <Icon
            icon="mdi:magnify"
            width="20"
            height="20"
            className="text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
            <Icon
              icon="mdi:shield-check"
              width="20"
              height="20"
              className="text-green-500"
            />
            <span className="font-bold text-gray-900 text-sm">
              {greenPoints.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm hidden md:inline">GP</span>
          </div>
          <button className="px-4 sm:px-5 py-2.5 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition whitespace-nowrap">
            Connect Wallet
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition">
            <Icon
              icon="mdi:bell"
              width="20"
              height="20"
              className="text-gray-600"
            />
          </button>
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center hidden sm:block"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJxWXiPQfwB4dRxx6-9SVvh0PmTNp3q4ZChjUZvJ6nefEelHCuwppDo2-ciTAa_Zoz0ecez2HAWmmCiqVhQpzZhsqCmUUhJM_gQKIq-f_IEhmtth9-zURmh5FjAdYT7yjx6Oac8o-ruAeWmzN-ngr4_1P3hpMBEtdWbnSIrZZ9coUhBetBwvndk1PTn1nJfdm2PpCMjEJKlV1MwFM9tRx7HC7YMI36p_eQcnrbg_ZXkWqCKnEUAKBSuFJOz-1-arfh1nfvInpIrRQ")',
            }}
          />
        </div>
    </header>
  );
}

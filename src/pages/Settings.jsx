import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { DashboardLayout } from "../components/shared/DashboardLayout";

export default function Settings({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [notifications, setNotifications] = useState({
    productSold: true,
    greenPointsEarned: true,
    newMessages: false,
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Quick runtime check so you can see in the browser console when this page mounts
    console.log("Settings mounted", { activeTab, theme });
  }, []);

  // If the DashboardLayout import failed or exported differently, show a helpful message
  if (
    typeof DashboardLayout !== "function" &&
    typeof DashboardLayout !== "object"
  ) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">Layout import error</h2>
        <p>
          DashboardLayout is undefined. Check console and terminal for
          import/build errors.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "wallet", label: "Wallet Management" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Privacy & Security" },
    { id: "theme", label: "Theme" },
  ];

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout
      activePage="Settings"
      showRightSidebar={false}
      onNavigate={onNavigate}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex flex-col gap-3 min-w-[250px]">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              Account Settings
            </h1>
            <p className="text-base text-green-700">
              Manage your profile, preferences, and security for the ReGen
              Marketplace.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-[68px] z-[9] bg-gray-50 pb-3">
          <div className="flex border-b border-gray-200 px-4 gap-4 sm:gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-green-500 text-gray-900"
                    : "border-b-transparent text-gray-500"
                }`}
              >
                <p className="text-sm font-bold">{tab.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="space-y-12">
          {/* Personal Information Section */}
          {activeTab === "personal" && (
            <section className="p-4 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
                    JD
                  </div>
                  <div className="flex gap-3">
                    <button className="h-10 px-4 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition">
                      Upload New
                    </button>
                    <button className="h-10 px-4 bg-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300 transition">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Jane Doe"
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="jane.doe@email.com"
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button className="h-10 px-6 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Wallet Management Section */}
          {activeTab === "wallet" && (
            <section className="p-4 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Wallet Management
              </h2>
              <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Connected Wallet</p>
                  <p className="font-mono text-gray-900">0.0.123456789ABCDEF</p>
                </div>
                <button className="h-10 px-4 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200 transition">
                  Disconnect
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 h-12 px-4 bg-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300 transition">
                  <Icon icon="mdi:shield-check" width="20" />
                  <span>Connect with Hedera</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 h-12 px-4 bg-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300 transition">
                  <Icon icon="mdi:wallet" width="20" />
                  <span>Connect with MetaMask</span>
                </button>
              </div>
            </section>
          )}

          {/* Notifications Section */}
          {activeTab === "notifications" && (
            <section className="p-4 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  {
                    key: "productSold",
                    title: "Product Sold",
                    desc: "Get notified when someone buys your product.",
                  },
                  {
                    key: "greenPointsEarned",
                    title: "GreenPoints Earned",
                    desc: "Get notified when you earn new GreenPoints.",
                  },
                  {
                    key: "newMessages",
                    title: "New Messages",
                    desc: "Get notified when you receive a new message.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => toggleNotification(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Privacy & Security Section */}
          {activeTab === "security" && (
            <section className="p-4 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Privacy & Security
              </h2>
              <div className="space-y-4">
                <div className="p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">
                      Update your password regularly for better security.
                    </p>
                  </div>
                  <button className="h-10 px-4 bg-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-300 transition">
                    Change
                  </button>
                </div>

                <div className="p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">
                      Two-Factor Authentication (2FA)
                    </p>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <button className="h-10 px-4 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-3 rounded-lg border border-red-300 bg-red-50 mt-8">
                  <p className="font-medium text-red-600">Account Deletion</p>
                  <p className="text-sm text-red-500 mb-3">
                    Permanently delete your account and all associated data.
                    This action is irreversible.
                  </p>
                  <button className="h-10 px-4 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition">
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Theme Section */}
          {activeTab === "theme" && (
            <section className="p-4 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 p-4 rounded-lg border-2 transition ${
                    theme === "light"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  <Icon
                    icon="mdi:white-balance-sunny"
                    className="text-3xl mb-2 mx-auto"
                  />
                  <p className="font-bold text-center">Light Mode</p>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 p-4 rounded-lg border-2 transition ${
                    theme === "dark"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  <Icon
                    icon="mdi:moon-waning-crescent"
                    className="text-3xl mb-2 mx-auto"
                  />
                  <p className="font-bold text-center">Dark Mode</p>
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

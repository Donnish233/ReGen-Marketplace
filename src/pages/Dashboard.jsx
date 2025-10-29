import { useState } from "react";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";

// Sidebar Component
function Sidebar() {
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = [
    { name: "Home", icon: "mdi:home" },
    { name: "My Products", icon: "mdi:package-variant" },
    { name: "Rewards", icon: "mdi:star" },
    { name: "Sell", icon: "mdi:cart" },
    { name: "Recycle", icon: "mdi:recycle" },
    { name: "Settings", icon: "mdi:cog" },
  ];

  return (
    <aside className="bg-white h-full lg:h-screen w-full lg:w-56 flex flex-col border-r border-gray-200 fixed lg:static left-0 top-0 z-40">
      <div className="flex items-center gap-3 p-6 mb-8">
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
        <span className="text-lg font-bold text-gray-900">ReGen</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1 px-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveNav(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              activeNav === item.name
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon icon={item.icon} width="20" height="20" />
            {item.name}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 p-4 border-t border-gray-200 mt-4">
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm">
          AD
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">Alex Doe</div>
          <div className="text-xs text-gray-500">alex.doe@email.com</div>
        </div>
      </div>
    </aside>
  );
}

// Category Card Component
function CategoryCard({ title, gradient, imageUrl }) {
  return (
    <div
      className="h-32 rounded-2xl p-5 flex items-end relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `${gradient}, url('${imageUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      <h3 className="text-white text-xl font-bold relative z-10">{title}</h3>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-full h-52 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              product.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <Icon icon={product.icon} width="16" height="16" />
          {product.description}
        </p>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            View Passport
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white transition ${
              product.status === "Available"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {product.status === "Available" ? "Buy" : "Recycle"}
          </button>
        </div>
      </div>
    </div>
  );
}

// GreenPoints Widget Component
function GreenPointsWidget() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        GreenPoints Summary
      </h3>
      <div className="bg-green-100 rounded-xl p-5 text-center mb-5">
        <div className="text-sm text-gray-600 mb-2">Your Balance</div>
        <div className="text-4xl font-bold text-gray-900">2,450</div>
        <div className="text-sm text-gray-600 mt-1">GreenPoints</div>
      </div>
      <div className="mb-5">
        <div className="text-sm font-semibold text-gray-700 mb-3">
          Your Eco Badges
        </div>
        <div className="grid grid-cols-4 gap-3">
          {["♻️", "📦", "⭐", "🔒"].map((emoji, idx) => {
            const colors = [
              "bg-green-200",
              "bg-blue-200",
              "bg-yellow-200",
              "bg-gray-200",
            ];
            return (
              <div
                key={idx}
                className={`w-10 h-12 ${colors[idx]} rounded-full flex items-center justify-center text-2xl text-white shadow-md`}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      </div>
      <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
        Redeem Points
      </button>
    </div>
  );
}

// Feed Widget Component
function FeedWidget() {
  const feedItems = [
    {
      icon: "♻️",
      color: "bg-green-100",
      text: "You earned ",
      highlight: "50 GreenPoints",
      suffix: " for recycling a shoe.",
      time: "2 hours ago",
    },
    {
      icon: "✓",
      color: "bg-blue-100",
      text: "3 new eco products verified on Hedera.",
      time: "1 day ago",
    },
    {
      icon: "📋",
      color: "bg-yellow-100",
      text: 'Your "Organic Tee" has been listed on the marketplace.',
      time: "3 days ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Sustainability Feed
      </h3>
      <div className="space-y-4">
        {feedItems.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div
              className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-lg shrink-0`}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed mb-1">
                {item.text}
                {item.highlight && (
                  <strong className="font-semibold text-green-500">
                    {item.highlight}
                  </strong>
                )}
                {item.suffix}
              </p>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const categories = [
    {
      title: "Shoes",
      gradient:
        "linear-gradient(135deg, rgba(22,101,52,0.9), rgba(21,128,61,0.8))",
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    },
    {
      title: "Cars",
      gradient:
        "linear-gradient(135deg, rgba(17,24,39,0.8), rgba(31,41,55,0.7))",
      imageUrl:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400",
    },
    {
      title: "Shirts",
      gradient:
        "linear-gradient(135deg, rgba(75,85,99,0.8), rgba(107,114,128,0.7))",
      imageUrl:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400",
    },
  ];

  const products = [
    {
      name: "EcoRunners 2.0",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      status: "Available",
      description: "Made from recycled ocean plastic",
      icon: "mdi:credit-card",
    },
    {
      name: "ReGen Model S",
      image:
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400",
      status: "Available",
      description: "Certified Recycled Parts",
      icon: "mdi:check-decagram",
    },
    {
      name: "Organic Tee",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      status: "For Recycling",
      description: "Made from 80% recycled fabric",
      icon: "mdi:chart-bar",
    },
    {
      name: "Heritage Boots",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      status: "Available",
      description: "Sustainably sourced leather",
      icon: "mdi:school",
    },
    {
      name: "Retro Kicks",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
      status: "For Recycling",
      description: "Eligible for material reclamation",
      icon: "mdi:recycle",
    },
    {
      name: "Minimalist Tee",
      image:
        "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400",
      status: "Available",
      description: "Made from 100% organic cotton",
      icon: "mdi:chart-bar",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 lg:ml-0 overflow-y-auto h-screen overflow-x-clip">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
            <div className="flex-1 max-w-lg flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
              <Icon
                icon="mdi:magnify"
                width="20"
                height="20"
                className="text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900"
              />
            </div>
            <div id="content">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <Icon
                icon="mdi:shield-check"
                width="20"
                height="20"
                className="text-green-500"
              />
              <span className="font-bold text-gray-900 text-sm">2,450</span>
              <span className="text-gray-600 text-sm">GreenPoints</span>
            </div>
            <button className="px-5 py-2.5 bg-green-500 text-white rounded-4xl font-semibold text-sm hover:bg-green-600 transition">
              Connect Wallet
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition">
              <Icon
                icon="mdi:account"
                width="20"
                height="20"
                className="text-gray-600"
              />
              </button>
              </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 p-8">
          <div className="space-y-8">
            {/* Featured Categories */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured Categories
                </h2>
                <a
                  href="#"
                  className="text-green-500 font-semibold text-sm hover:text-green-600"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <CategoryCard key={cat.title} {...cat} />
                ))}
              </div>
            </section>

            {/* Marketplace */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Marketplace
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            <GreenPointsWidget />
            <FeedWidget />
          </aside>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

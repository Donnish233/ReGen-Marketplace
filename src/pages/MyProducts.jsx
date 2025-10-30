import { useState } from "react";
import { Icon } from "@iconify/react";
import { DashboardLayout } from "../components/shared/DashboardLayout";

export default function MyProducts({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All Products");

  const filters = [
    "All Products",
    "For Sale",
    "For Recycling",
    "Repaired",
    "Most Sustainable",
    "Newest Purchase",
  ];

  const products = [
    {
      name: "EcoStep Sneaker",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      score: 95,
      status: "Owned",
      actionButton: "List for Sale",
    },
    {
      name: "ReVolt Electric Car",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400",
      score: 88,
      status: "Listed for Sale",
      actionButton: "Initiate Recycling",
    },
    {
      name: "Bamboo Toothbrush",
      image:
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
      score: 99,
      status: "Ready for Recycling",
      actionButton: "Request Repair",
    },
  ];

  return (
    <DashboardLayout
      activePage="My Products"
      showRightSidebar={false}
      onNavigate={onNavigate}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col gap-2 min-w-[250px]">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              My Verified Products
            </h1>
            <p className="text-base text-green-700">
              Track the journey and sustainability of your owned items.
            </p>
          </div>
          <button className="h-10 px-4 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition flex items-center gap-2">
            <Icon icon="mdi:plus-circle" width="18" height="18" />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`h-8 shrink-0 px-4 rounded-full text-sm font-medium transition whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-green-100 text-gray-900"
                  : "bg-gray-200/50 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col gap-4 rounded-xl bg-white p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-full aspect-square bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="flex flex-col gap-2">
                <p className="text-base font-bold text-gray-900">
                  {product.name}
                </p>
                <div className="flex justify-between items-center text-sm text-green-700">
                  <span>Sustainability Score</span>
                  <span className="font-bold">♻️ {product.score}%</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Status</span>
                  <span className="font-medium text-gray-800">
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                <button className="text-sm font-semibold h-9 rounded-md bg-gray-200/60 text-gray-800 hover:bg-gray-200 transition">
                  View Passport
                </button>
                <button className="text-sm font-semibold h-9 rounded-md bg-gray-200/60 text-gray-800 hover:bg-gray-200 transition">
                  {product.actionButton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

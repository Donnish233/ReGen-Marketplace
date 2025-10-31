import { useState } from "react";
import { Icon } from "@iconify/react";
import { DashboardLayout } from "../components/shared/DashboardLayout";

export default function Recycle({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const categories = ["All Products", "Electronics", "Textiles", "Plastics"];

  const products = [
    {
      id: 1,
      name: "Eco-Sound Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      score: 85,
      status: "Eligible for Recycling",
    },
    {
      id: 2,
      name: "HydroLoop Bottle",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
      score: 92,
      status: "Eligible for Recycling",
    },
    {
      id: 3,
      name: "Organic Cotton Tee",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      score: 78,
      status: "Eligible for Recycling",
    },
  ];

  const recyclingHistory = [
    { name: "Sustainable Sneakers", date: "2023-04-12", points: 150 },
    { name: "ReGen Bamboo Toothbrush", date: "2023-03-28", points: 50 },
  ];

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const estimatedPoints = selectedProducts.length * 50;

  return (
    <DashboardLayout
      activePage="Recycle"
      showRightSidebar={false}
      onNavigate={onNavigate}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Recycle Your Verified Products
          </h1>
          <p className="text-base text-green-700">
            Give your end-of-life products a new purpose and earn GreenPoints
            for your eco-action.
          </p>
        </div>

        {/* Section 1: Product Selection */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">
            Step 1: Choose Items for Recycling
          </h2>

          {/* Category Chips */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-9 shrink-0 px-4 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-green-500/30 text-gray-900"
                    : "bg-green-500/20 hover:bg-green-500/30 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <label
                  className="absolute top-3 right-3 z-10 cursor-pointer"
                  htmlFor={`product-${product.id}`}
                >
                  <input
                    className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                    id={`product-${product.id}`}
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                  />
                </label>
                <div
                  className="w-full aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-lg text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Status: {product.status}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon
                      icon="mdi:shield-check"
                      className="text-green-500"
                      width="20"
                    />
                    <p className="text-sm font-medium text-gray-700">
                      Sustainability Score: {product.score}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Partner Selection & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-2xl font-bold">
              Step 2: Find a Recycling Partner
            </h2>
            <div className="aspect-video w-full rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Map View (Integration Required)</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl font-bold">Step 3: Review & Confirm</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">Summary</h3>
                {selectedProducts.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No items selected yet.
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    {selectedProducts.length} item(s) selected for recycling
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900">
                      Estimated Earnings
                    </p>
                    <p className="font-bold text-green-500 text-lg">
                      {estimatedPoints} GP
                    </p>
                  </div>
                  <button
                    className={`w-full h-12 px-4 rounded-lg text-base font-bold tracking-[0.015em] transition ${
                      selectedProducts.length === 0
                        ? "bg-green-500/50 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    disabled={selectedProducts.length === 0}
                  >
                    Initiate Recycling
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Recycling History */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">My Recycling History</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Product(s)
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      GreenPoints
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recyclingHistory.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.date}</td>
                      <td className="px-6 py-4 font-medium text-green-500">
                        +{item.points} GP
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

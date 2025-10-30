import { Icon } from "@iconify/react";

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-full h-48 sm:h-52 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3 gap-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              product.status === "Available"
                ? "bg-green-100 text-green-700"
                : product.status === "For Recycling"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {product.status}
          </span>
        </div>
        <p className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <Icon
            icon={product.icon || "mdi:information"}
            width="16"
            height="16"
          />
          <span className="line-clamp-1">{product.description}</span>
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
            {product.actionButton ||
              (product.status === "Available" ? "Buy" : "Recycle")}
          </button>
        </div>
      </div>
    </div>
  );
}

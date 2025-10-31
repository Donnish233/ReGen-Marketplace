import { useState } from "react";
import { Icon } from "@iconify/react";
import { DashboardLayout } from "../components/shared/DashboardLayout";

export default function Sell({ onNavigate }) {
  const [condition, setCondition] = useState("New");
  const [currency, setCurrency] = useState("GP");
  const [deliveryOptions, setDeliveryOptions] = useState({
    localPickup: true,
    shipping: false,
    hederaEscrow: false,
  });

  const conditions = ["New", "Like New", "Good", "Fair"];

  const activeListings = [
    {
      name: "Organic Cotton T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      price: "25 GP",
      status: "Active",
    },
    {
      name: "Upcycled Wooden Chair",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
      price: "120 GP",
      status: "Pending Approval",
    },
  ];

  const toggleDelivery = (option) => {
    setDeliveryOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSubmit = () => {
    console.log("Product listed for sale");
  };

  return (
    <DashboardLayout
      activePage="Sell"
      showRightSidebar={false}
      onNavigate={onNavigate}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-col gap-2 min-w-[250px]">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              Sell Your Sustainable Items
            </h1>
            <p className="text-base text-green-700">
              List your verified products to give them a new life and earn
              GreenPoints or fiat.
            </p>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-base text-gray-700 leading-relaxed">
          To get started, select one of your verified products from the list
          below. Fill in the details about its condition, set your price, and
          upload some photos to create your listing. Our verification process
          ensures trust and transparency for buyers.
        </p>

        {/* Form and Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Listing Form (Left Side) */}
          <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-6">
              {/* Select Product */}
              <div className="flex flex-col">
                <label className="text-base font-medium text-gray-900 mb-2">
                  Select Product
                </label>
                <select className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Recycled Glass Water Bottle</option>
                  <option>Organic Cotton T-Shirt - M</option>
                  <option>Upcycled Wooden Chair</option>
                  <option>Add New Product...</option>
                </select>
              </div>

              {/* Product Condition */}
              <div>
                <p className="text-base font-medium text-gray-900 mb-2">
                  Product Condition
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`text-center p-3 rounded-lg border font-medium transition ${
                        condition === cond
                          ? "border-green-500 bg-green-100 text-gray-900"
                          : "border-gray-300 hover:border-green-500 text-gray-700"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asking Price */}
              <div className="flex flex-col">
                <label className="text-base font-medium text-gray-900 mb-2">
                  Asking Price
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="50.00"
                    className="flex-1 h-12 px-4 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="h-12 px-4 rounded-r-lg border-l-0 border border-gray-300 bg-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>GP</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-base font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the item, its history, and any unique features or flaws..."
                  className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                />
              </div>

              {/* Upload Photos */}
              <div>
                <p className="text-base font-medium text-gray-900 mb-2">
                  Upload Photos
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Icon
                        icon="mdi:cloud-upload"
                        className="text-gray-400 mb-3"
                        width="48"
                      />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <p className="text-base font-medium text-gray-900 mb-2">
                  Delivery Options
                </p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries({
                    localPickup: "Local Pickup",
                    shipping: "Shipping",
                    hederaEscrow: "Hedera Escrow",
                  }).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={deliveryOptions[key]}
                        onChange={() => toggleDelivery(key)}
                        className="w-4 h-4 rounded text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section (Right Side) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Listing Preview
              </h3>
              <div className="space-y-4">
                <div
                  className="aspect-video w-full bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400")',
                  }}
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Recycled Glass Water Bottle
                    </h4>
                    <p className="text-sm text-gray-500">
                      Condition: {condition}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-green-500">
                    50 {currency}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  A beautifully crafted water bottle made from 100% recycled
                  glass. Keeps your drinks cool and helps the planet. Includes
                  bamboo lid.
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full h-12 px-4 bg-green-500 text-white rounded-lg text-base font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30"
            >
              List Product for Sale
            </button>
          </div>
        </div>

        {/* My Active Listings */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            My Active Listings
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Product
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeListings.map((listing, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${listing.image})` }}
                        />
                        {listing.name}
                      </th>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {listing.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            listing.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="font-medium text-green-500 hover:underline">
                          Edit
                        </button>
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

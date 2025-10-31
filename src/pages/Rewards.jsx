import { useState } from "react";
import { Icon } from "@iconify/react";
import { DashboardLayout } from "../components/shared/DashboardLayout";

export default function Rewards({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Catalog");

  const rewards = [
    {
      title: "20% off Eco-Friendly Brands",
      description:
        "Get a discount on your next purchase from our curated list of sustainable partners.",
      points: 750,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    },
    {
      title: "Exclusive NFT Badge",
      description:
        'Mint a unique "Eco-Pioneer" digital collectible to showcase your commitment.',
      points: 1500,
      image:
        "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400",
    },
    {
      title: "Donate to Reforestation",
      description:
        "Contribute to our partner project and help plant a tree in a critical ecosystem.",
      points: 500,
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
    },
    {
      title: "Free Repair Service Voucher",
      description:
        "Redeem a voucher for a free repair on one of your eligible electronic items.",
      points: 1000,
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    },
  ];

  return (
    <DashboardLayout
      activePage="Rewards"
      showRightSidebar={false}
      onNavigate={onNavigate}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-col gap-2 min-w-[250px]">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              Your GreenPoints Rewards
            </h1>
            <p className="text-base text-green-700">
              Unlock exclusive benefits and make a bigger impact with your
              sustainability efforts.
            </p>
          </div>
        </div>

        {/* GreenPoints Balance Card */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm font-medium">
              GreenPoints Balance
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                <Icon icon="mdi:leaf" className="text-green-500" width="24" />
              </div>
              <p className="text-gray-900 text-4xl font-bold">1,250</p>
            </div>
            <p className="text-gray-600 text-sm mt-1">Available to Redeem</p>
          </div>

          <div className="flex flex-col gap-4 p-4 rounded-lg bg-green-50 items-start sm:items-center justify-center">
            <p className="text-gray-900 font-bold">How to Earn GreenPoints</p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:recycle"
                  className="text-green-500"
                  width="20"
                />
                <span>Recycle Verified Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:cart" className="text-green-500" width="20" />
                <span>Resell Used Items</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-green-500"
                  width="20"
                />
                <span>Participate in Eco-Challenges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pb-3">
          <div className="flex border-b border-gray-200 gap-8">
            {["Catalog", "Activity History"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                  activeTab === tab
                    ? "border-b-green-500 text-gray-900"
                    : "border-b-transparent text-gray-500"
                }`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                  {tab}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Catalog Grid */}
        {activeTab === "Catalog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.title}
                className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-full aspect-video bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${reward.image})` }}
                />
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-bold text-gray-900">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {reward.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-green-500 text-sm font-bold">
                    {reward.points} Points
                  </p>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition">
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activity History Tab */}
        {activeTab === "Activity History" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Activity
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Points
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-600">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Recycled Sneakers
                    </td>
                    <td className="px-6 py-4 text-gray-600">2024-10-20</td>
                    <td className="px-6 py-4 font-medium text-green-500">
                      +150 GP
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Earned
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Redeemed NFT Badge
                    </td>
                    <td className="px-6 py-4 text-gray-600">2024-10-15</td>
                    <td className="px-6 py-4 font-medium text-red-500">
                      -1500 GP
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Redeemed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Sold Organic Tee
                    </td>
                    <td className="px-6 py-4 text-gray-600">2024-10-10</td>
                    <td className="px-6 py-4 font-medium text-green-500">
                      +75 GP
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Earned
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export function ImpactWidget({ co2Saved = "12.7 kg", itemsRecycled = 8 }) {
  const stats = [
    { icon: "mdi:cloud-outline", value: co2Saved, label: "CO2 Saved" },
    { icon: "mdi:recycle", value: `${itemsRecycled} Items`, label: "Recycled" },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Impact</h3>
      <div className="space-y-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-500">
              <Icon icon={stat.icon} width="24" height="24" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

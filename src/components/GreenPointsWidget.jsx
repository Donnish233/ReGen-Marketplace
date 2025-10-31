export function GreenPointsWidget({ points = 2450 }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        GreenPoints Summary
      </h3>
      <div className="bg-green-100 rounded-xl p-5 text-center mb-5">
        <div className="text-sm text-gray-600 mb-2">Your Balance</div>
        <div className="text-4xl font-bold text-gray-900">
          {points.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 mt-1">GreenPoints</div>
      </div>
      <div className="mb-5">
        <div className="text-sm font-semibold text-gray-700 mb-3">
          Your Eco Badges
        </div>
        <div className="grid grid-cols-4 gap-2 mx-auto">
          {["♻️", "📦", "⭐", "🔒"].map((emoji, idx) => {
            const colors = [
              "bg-green-100",
              "bg-blue-100",
              "bg-yellow-100",
              "bg-gray-200",
            ];
            const color = colors[idx];
            return (
              <div
                key={idx}
                className={`w-10 h-14 rounded-4xl flex items-center justify-center text-2xl ${color} transition`}
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

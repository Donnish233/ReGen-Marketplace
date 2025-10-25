import { Icon } from "@iconify/react";

export default function Points() {
  return (
    <section className="bg-white px-6 py-10 my-18 rounded-2xl">
      <div id="claim" className="mb-12">
        <div className="flex flex-col gap-8">
          <h2 className="text-6xl font-bold">
            Earn Greenpoints for sustainable Actions.
          </h2>
          <p className="text-2xl">
            Recycle, resell, or repair verified products to earn rewards.
          </p>
        </div>
        <button className="h-14 w-56 text-lg font-bold bg-green-500 text-white py-1 px-4 rounded-2xl">
          Claim Rewards
        </button>
      </div>
      <section className="w-96 h-56 p-6 rounded-3xl bg-gray-200 flex flex-col justify-center items-center gap-4">
        <Icon
          icon="solar:wallet-linear"
          width="50"
          height="50"
          style={{ color: "#76ed43" }}
        />
        <h3 className="text-lg font-bold">Current Balance</h3>
        <p className="text-green-600 font-bold text-3xl">1,250 GP</p>
      </section>
    </section>
  );
}

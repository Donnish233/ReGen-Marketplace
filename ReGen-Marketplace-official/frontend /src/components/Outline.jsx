import { Icon } from "@iconify/react";

export default function Timeline() {
  const steps = [
    {
      stage: "Created",
      icon: (
        <Icon
          icon="la:industry"
          width="32"
          height="32"
          className="text-green-600"
        />
      ),
    },
    {
      stage: "Owned",
      icon: (
        <Icon
          icon="fluent-mdl2:contact"
          width="32"
          height="32"
          className="text-green-600"
        />
      ),
    },
    {
      stage: "Repaired",
      icon: (
        <Icon
          icon="pepicons-pop:wrench"
          width="32"
          height="32"
          className="text-green-600"
        />
      ),
    },
    {
      stage: "Resold",
      icon: (
        <Icon
          icon="ic:outline-shopping-cart"
          width="32"
          height="32"
          className="text-green-600"
        />
      ),
    },
    {
      stage: "Recycled",
      icon: (
        <Icon
          icon="mdi:recycle"
          width="32"
          height="32"
          className="text-green-600"
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        The Journey of Your Product
      </h1>

      <div className="timeline flex flex-col gap-6">
        {steps.map(({ stage, icon }, index) => (
          <div
            key={index}
            className="timeline-item flex items-center gap-4 pl-4"
          >
            <div className="icon flex justify-center items-center bg-green-100 rounded-full p-2">
              {icon}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">{stage}</h3>
              <p className="text-green-500 text-sm mt-1.5">
                Verified on Hedera Mirror Node
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

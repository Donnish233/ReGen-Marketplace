import { Icon } from "@iconify/react";

function OverV() {
   return (
     <section className="bg-white mx-6 px-6 py-10 my-18 rounded-2xl">
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

  function Timeline() {
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

function Prods() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        My Verified Products
      </h1>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-10/12 overflow-hidden mx-auto">
        {[
          {
            imgSrc: "/images/Brown sneakers.jpg",
            alt: "Brown Can",
            name: "Eco-Friendly Sneaker",
            score: 92,
            status: "Owned",
          },
          {
            imgSrc: "/images/Red sneakers.jpg",
            alt: "Red Sneakers",
            name: "Recycled Material Backpack",
            score: 85,
            status: "Owned",
          },
          {
            imgSrc: "/images/White Cotton Shirt.png",
            alt: "White T-shirt",
            name: "Organic Cotton T-Shirt",
            score: 95,
            status: "Resold",
          },
        ].map(({ imgSrc, alt, name, score, status }) => (
          <div className="w-80 bg-white rounded-lg p-6 space-y-4">
            <img
              src={imgSrc}
              alt={alt}
              className="h-70 w-66 bg-gray-400 rounded-2xl mx-auto"
            />
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-green-600 mb-4">
              Sustainability Score: {score}/100{" "}
              <span
                className={`w-11 h-11 rounded-full py-1 px-2 border transition-all duration-150 hover:cursor-pointer
              ${
                status === "Owned"
                  ? "bg-green-300 text-green-800 border-green-400"
                  : "bg-red-300 text-red-800 border-red-400"
              }
            `}
              >
                {status}
              </span>
            </p>
            <button
              type="submit"
              className="w-full h-10 rounded-2xl bg-green-300 text-green-800 flex justify-center items-center gap-3 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="4"
                >
                  <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z" />
                  <path stroke-linecap="round" d="m16 24l6 6l12-12" />
                </g>
              </svg>
              View Verification
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default function Centre() {
  return (
      <>
      <main className="flex items-center mx-6 mt-16 border-t border-t-green-100">
        <section className="flex flex-col gap-5 [&>button]:h-12 [&>button]:px-5 [&>button]:py-2 [&>button]:border [&>button]:border-gray-500 [&>button]:rounded-2xl">
          <h1 className="text-6xl font-bold">Transparency is the new currency of sustainability.</h1>
          <p>
            Scan any product to see its verified journey -- from creation to
            recycling.
          </p>
          <button className="w-60 text-white bg-green-500 flex justify-center items-center gap-3">
            <Icon icon="ic:outline-qr-code-scanner" width="24" height="24" />
            Scan Product QR
          </button>
          <button className="w-68 font-bold">Browse Sustainable Items</button>
        </section>
        <img src="/images/Photoroom.png" alt="" className="w-full h-auto"/>
      </main>

      <Timeline/>

      <OverV />

      <Prods/>
      </>
    );
}
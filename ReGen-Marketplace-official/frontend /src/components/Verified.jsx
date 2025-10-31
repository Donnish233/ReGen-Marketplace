export default function Prod() {
    
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
          ].map(({ imgSrc, alt, name, score, status }, index) => (
            <div key={index} className="w-80 bg-white rounded-lg p-6 space-y-4">
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
                    strokeLinejoin="round"
                    strokeWidth="4"
                  >
                    <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z" />
                    <path strokeLinecap="round" d="m16 24l6 6l12-12" />
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
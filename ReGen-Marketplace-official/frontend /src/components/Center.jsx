import { Icon } from "@iconify/react";

export default function Main() {
    return (
      <main className="flex items-center mt-16 border-t border-t-green-100">
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
    );
}
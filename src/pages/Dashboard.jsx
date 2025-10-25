import Header from "../components/Top";
import Points from "../components/Display";
import Prod from "../components/Verified";
import Footer from "../components/Bottom";

export default function Dashboard({ accountId, greenPoints }) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <section className="flex justify-between items-center p-5 bg-gray-50">
        <h2 className="text-2xl font-bold text-green-700">
          Welcome, {accountId || "User"}!
        </h2>
        <div className="bg-green-100 px-5 py-2 rounded-xl text-green-700 font-medium">
          {greenPoints.toLocaleString()} GreenPoints
        </div>
      </section>
      <Points />
      <Prod />
      <Footer />
    </div>
  );
}

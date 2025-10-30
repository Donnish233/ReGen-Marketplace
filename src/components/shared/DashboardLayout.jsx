import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GreenPointsWidget } from "./GreenPointsWidget";
import { ImpactWidget } from "./ImpactWidget";
import { Foot } from "./Foot";

export function DashboardLayout({
  activePage,
  children,
  showRightSidebar = false,
  onNavigate,
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden">
          {showRightSidebar ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 max-w-7xl mx-auto">
              <div>{children}</div>
              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                <GreenPointsWidget />
                <ImpactWidget />
              </aside>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">{children}</div>
          )}
          <Foot />
        </div>
      </main>
    </div>
  );
}

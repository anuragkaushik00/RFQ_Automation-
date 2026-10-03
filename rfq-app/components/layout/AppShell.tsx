import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import ComposeModal from "@/components/shared/ComposeModal";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopBar />
      <Sidebar />
      <main className="ml-56 pt-16">{children}</main>
      <ComposeModal />
    </div>
  );
}

"use client";

import { Search, PenSquare, Bell, ChevronDown } from "lucide-react";
import { useCompose } from "@/components/shared/ComposeContext";
import { useSession } from "next-auth/react";

export default function TopBar() {
  const { openCompose } = useCompose();
  const { data: session } = useSession();

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ME";

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur">
      <div className="flex w-56 shrink-0 items-center gap-2 pl-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
          <span className="text-sm font-bold text-white">R</span>
        </div>
        <span className="text-base font-semibold tracking-tight text-zinc-100">
          RFQ<span className="text-blue-400">Pilot</span>
        </span>
      </div>

      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-2xl">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            id="global-search"
            type="search"
            placeholder="Search emails, RFQs, vendors…"
            className="h-10 w-full rounded-full border border-zinc-700 bg-zinc-800/60 pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 transition-colors focus:border-blue-500 focus:bg-zinc-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="compose-btn"
          onClick={() => openCompose()}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500 hover:shadow-blue-800/40 active:scale-95"
        >
          <PenSquare size={15} />
          Compose
        </button>

        <button
          id="notifications-btn"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <button
          id="user-menu-btn"
          className="flex h-9 items-center gap-1.5 rounded-full pl-1 pr-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
            {userInitials}
          </div>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}

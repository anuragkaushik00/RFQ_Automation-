"use client";

import { useState } from "react";
import ItemRow from "@/components/shared/ItemRow";
import type { ItemRowData } from "@/lib/types";
import { RefreshCw, Filter } from "lucide-react";

type ListPaneProps = {
  title: string;
  items: ItemRowData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  headerAction?: React.ReactNode;
  onRefresh?: () => void;
};

export default function ListPane({
  title,
  items,
  selectedId,
  onSelect,
  headerAction,
  onRefresh,
}: ListPaneProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const visible = filter === "unread" ? items.filter((i) => !i.isRead) : items;

  return (
    <div className="flex h-full flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
            {items.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {headerAction}
          <button
            id="list-filter-btn"
            onClick={() => setFilter((f) => (f === "all" ? "unread" : "all"))}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            <Filter size={12} />
            {filter === "all" ? "All" : "Unread"}
          </button>
          <button
            id="list-refresh-btn"
            onClick={onRefresh}
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-600">
            <RefreshCw size={24} />
            <p className="text-sm">No items</p>
          </div>
        ) : (
          visible.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}

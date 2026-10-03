"use client";

import { cn } from "@/lib/utils";
import type { ItemRowData } from "@/lib/types";

type ItemRowProps = {
  item: ItemRowData;
  selected: boolean;
  onSelect: (id: string) => void;
};

function getTagStyle(tag: string): string {
  const normalized = tag.toLowerCase();
  switch (normalized) {
    case "urgent":
      return "bg-red-900/60 text-red-400 border border-red-800/50";
    case "quote":
    case "received":
      return "bg-emerald-900/60 text-emerald-400 border border-emerald-800/50";
    case "open":
    case "sent":
      return "bg-blue-900/60 text-blue-400 border border-blue-800/50";
    case "partial":
      return "bg-amber-900/60 text-amber-400 border border-amber-800/50";
    case "evaluating":
      return "bg-purple-900/60 text-purple-400 border border-purple-800/50";
    case "awarded":
      return "bg-teal-900/60 text-teal-300 border border-teal-800/50";
    case "draft":
      return "bg-zinc-800 text-zinc-400 border border-zinc-700";
    case "closed":
      return "bg-zinc-900 text-zinc-500 border border-zinc-800";
    case "active":
      return "bg-green-950/60 text-green-400 border border-green-800/40";
    case "inactive":
      return "bg-zinc-900 text-zinc-500 border border-zinc-800";
    default:
      return "bg-zinc-800 text-zinc-400 border border-zinc-700";
  }
}

export default function ItemRow({ item, selected, onSelect }: ItemRowProps) {
  return (
    <button
      id={`item-row-${item.id}`}
      onClick={() => onSelect(item.id)}
      className={cn(
        "group flex w-full items-start gap-3 border-b border-zinc-800/60 px-4 py-3 text-left transition-colors hover:bg-zinc-800/50",
        selected && "bg-blue-600/10 hover:bg-blue-600/15",
        !item.isRead && "bg-zinc-900"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 text-xs font-semibold text-zinc-200 ring-1 ring-zinc-700/50">
        {item.avatarFallback ?? item.from[0]}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "truncate text-sm",
              item.isRead ? "font-normal text-zinc-400" : "font-semibold text-zinc-100"
            )}
          >
            {item.from}
          </span>
          <span className="shrink-0 text-[11px] text-zinc-500">{item.timestamp}</span>
        </div>

        <p
          className={cn(
            "truncate text-sm",
            item.isRead ? "text-zinc-400" : "font-medium text-zinc-200"
          )}
        >
          {item.subject}
        </p>

        <div className="flex items-center gap-2 mt-0.5">
          <p className="flex-1 truncate text-xs text-zinc-500">{item.preview}</p>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                getTagStyle(tag)
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {!item.isRead && (
        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      )}
    </button>
  );
}

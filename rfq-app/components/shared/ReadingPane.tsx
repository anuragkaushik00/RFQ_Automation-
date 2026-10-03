"use client";

import type { ReadingPaneData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Reply, ReplyAll, Forward, MoreHorizontal, Star, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type ReadingPaneProps = {
  data: ReadingPaneData | null;
};

export default function ReadingPane({ data }: ReadingPaneProps) {
  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-950 text-zinc-600">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
          <Reply size={28} className="text-zinc-700" />
        </div>
        <p className="text-sm font-medium">Select an item to read</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-lg font-semibold leading-snug text-zinc-100">
            {data.subject}
          </h1>
          <div className="flex shrink-0 items-center gap-1">
            <ToolBtn id="reading-star" icon={<Star size={16} />} />
            <ToolBtn id="reading-trash" icon={<Trash2 size={16} />} />
            <ToolBtn id="reading-more" icon={<MoreHorizontal size={16} />} />
          </div>
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="mt-1.5 flex gap-1.5">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  tag === "urgent"
                    ? "bg-red-900/60 text-red-400"
                    : tag === "quote"
                    ? "bg-green-900/60 text-green-400"
                    : "bg-zinc-800 text-zinc-400"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-zinc-800 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 text-xs font-semibold text-zinc-200">
            {data.from[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-zinc-100">{data.from}</span>
              <span className="text-xs text-zinc-500">&lt;{data.fromEmail}&gt;</span>
            </div>
            <p className="text-xs text-zinc-500">
              to <span className="text-zinc-400">{data.to}</span>
            </p>
          </div>
          <span className="shrink-0 text-xs text-zinc-500">{data.timestamp}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="prose prose-sm prose-invert max-w-none leading-relaxed text-zinc-300">
          <ReactMarkdown>{data.body}</ReactMarkdown>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-6 py-3">
        <div className="flex gap-2">
          <ActionBtn id="reading-reply" icon={<Reply size={14} />} label="Reply" />
          <ActionBtn id="reading-reply-all" icon={<ReplyAll size={14} />} label="Reply All" />
          <ActionBtn id="reading-forward" icon={<Forward size={14} />} label="Forward" />
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ id, icon }: { id: string; icon: React.ReactNode }) {
  return (
    <button
      id={id}
      className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
    >
      {icon}
    </button>
  );
}

function ActionBtn({
  id,
  icon,
  label,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      id={id}
      className="flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
    >
      {icon}
      {label}
    </button>
  );
}

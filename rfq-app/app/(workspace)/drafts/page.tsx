"use client";

import { useState } from "react";
import ListPane from "@/components/shared/ListPane";
import ReadingPane from "@/components/shared/ReadingPane";
import type { ItemRowData } from "@/lib/types";

const DRAFT_ITEMS: ItemRowData[] = [
  {
    id: "d1",
    from: "Draft",
    subject: "RFQ #1025 – Conveyor Belts",
    preview: "Vendor list: 3 selected. Specs attached. Ready to send.",
    timestamp: "Today",
    isRead: true,
    tags: ["ready"],
    avatarFallback: "D",
  },
  {
    id: "d2",
    from: "Draft",
    subject: "RFQ #1026 – Motor Bearings",
    preview: "Draft started. Specs incomplete — waiting for engineering.",
    timestamp: "Yesterday",
    isRead: true,
    avatarFallback: "D",
  },
];

export default function DraftsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <div className="split-view">
      <ListPane
        title="Drafts"
        items={DRAFT_ITEMS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ReadingPane data={null} />
    </div>
  );
}

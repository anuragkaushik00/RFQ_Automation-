"use client";

import { useState } from "react";
import ListPane from "@/components/shared/ListPane";
import ReadingPane from "@/components/shared/ReadingPane";
import { INBOX_ITEMS, READING_PANE_SAMPLE } from "@/lib/placeholder-data";
import type { ReadingPaneData } from "@/lib/types";

const DETAIL_MAP: Record<string, ReadingPaneData> = {
  "1": READING_PANE_SAMPLE,
};

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>("1");

  const detail = selectedId ? (DETAIL_MAP[selectedId] ?? null) : null;

  return (
    <div className="split-view">
      <ListPane
        title="Inbox"
        items={INBOX_ITEMS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ReadingPane data={detail} />
    </div>
  );
}

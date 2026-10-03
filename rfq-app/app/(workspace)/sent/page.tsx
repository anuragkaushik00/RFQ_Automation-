"use client";

import { useState } from "react";
import ListPane from "@/components/shared/ListPane";
import ReadingPane from "@/components/shared/ReadingPane";
import type { ItemRowData } from "@/lib/types";

const SENT_ITEMS: ItemRowData[] = [
  {
    id: "s1",
    from: "Me",
    subject: "RFQ #1024 – Steel Brackets",
    preview: "Please find our RFQ for 500 units of Steel Bracket Type-A attached.",
    timestamp: "Sep 24",
    isRead: true,
    tags: ["rfq"],
    avatarFallback: "ME",
  },
  {
    id: "s2",
    from: "Me",
    subject: "RFQ #1023 – Hydraulic Fittings",
    preview: "Kindly quote your best price for 200 units of M16 hydraulic fittings.",
    timestamp: "Sep 22",
    isRead: true,
    avatarFallback: "ME",
  },
  {
    id: "s3",
    from: "Me",
    subject: "Follow-up: RFQ #1021 – Stainless Fasteners",
    preview: "Just a gentle reminder about our pending RFQ. Please revert at your earliest convenience.",
    timestamp: "Sep 19",
    isRead: true,
    tags: ["follow-up"],
    avatarFallback: "ME",
  },
];

export default function SentPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <div className="split-view">
      <ListPane
        title="Sent"
        items={SENT_ITEMS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ReadingPane data={null} />
    </div>
  );
}

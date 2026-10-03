import type { ItemRowData, ReadingPaneData } from "@/lib/types";

export const INBOX_ITEMS: ItemRowData[] = [
  {
    id: "1",
    from: "Acme Supplies",
    subject: "Re: RFQ #1024 – Steel Brackets",
    preview: "Please find our updated quotation attached. Lead time is 14 days from PO.",
    timestamp: "10:32 AM",
    isRead: false,
    tags: ["quote"],
    avatarFallback: "AS",
  },
  {
    id: "2",
    from: "Global Parts Co.",
    subject: "Quotation for Hydraulic Hoses",
    preview: "We are pleased to submit our competitive pricing for the requested items.",
    timestamp: "9:15 AM",
    isRead: false,
    tags: ["urgent"],
    avatarFallback: "GP",
  },
  {
    id: "3",
    from: "TechFab Industries",
    subject: "RFQ #1023 Acknowledgment",
    preview: "Thank you for sending the RFQ. Our team will review and respond within 2 business days.",
    timestamp: "Yesterday",
    isRead: true,
    avatarFallback: "TF",
  },
  {
    id: "4",
    from: "Precision Metal Works",
    subject: "Clarification on Specs – RFQ #1021",
    preview: "Could you clarify the tolerance requirement on drawing PMW-44? We need ±0.02mm confirmed.",
    timestamp: "Yesterday",
    isRead: true,
    tags: ["needs-reply"],
    avatarFallback: "PM",
  },
  {
    id: "5",
    from: "Eastern Fasteners",
    subject: "Updated price list Q4 2026",
    preview: "Please see our updated catalogue and pricing effective October 1st, 2026.",
    timestamp: "Mon",
    isRead: true,
    avatarFallback: "EF",
  },
];

export const READING_PANE_SAMPLE: ReadingPaneData = {
  id: "1",
  from: "Acme Supplies",
  fromEmail: "quotes@acme-supplies.com",
  to: "procurement@mycompany.com",
  subject: "Re: RFQ #1024 – Steel Brackets",
  timestamp: "Saturday, Sep 26, 2026 at 10:32 AM",
  tags: ["quote"],
  body: `Hi Team,

Please find our updated quotation for RFQ #1024 – Steel Brackets attached to this email.

**Summary:**
- Item: Steel Bracket Type-A (Grade 304 SS)
- Quantity: 500 units
- Unit Price: ₹185.00
- Total: ₹92,500.00
- Lead Time: 14 working days from Purchase Order
- Validity: 30 days from quote date

Please confirm if the specifications on our attached drawing match your requirements. We are happy to adjust quantity breaks for better pricing.

Looking forward to your order.

Best regards,  
Rajesh Patel  
Sales Manager – Acme Supplies  
+91 98765 43210`,
};

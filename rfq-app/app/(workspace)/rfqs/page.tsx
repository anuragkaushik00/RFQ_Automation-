"use client";

import { useState, useEffect, useCallback } from "react";
import ListPane from "@/components/shared/ListPane";
import DataTable, { ColumnDef } from "@/components/shared/DataTable";
import SchemaForm from "@/components/shared/SchemaForm";
import { useCompose } from "@/components/shared/ComposeContext";
import type { RfqRecord, RfqItemInput, ItemRowData, FormFieldConfig } from "@/lib/types";
import {
  FileText,
  Plus,
  Calendar,
  IndianRupee,
  Building2,
  Edit2,
  Trash2,
  Clock,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RFQ_EDIT_FIELDS: FormFieldConfig[] = [
  {
    name: "title",
    label: "RFQ Title / Subject",
    type: "text",
    required: true,
    gridSpan: 2,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "DRAFT", value: "DRAFT" },
      { label: "SENT", value: "SENT" },
      { label: "PARTIAL", value: "PARTIAL" },
      { label: "RECEIVED", value: "RECEIVED" },
      { label: "EVALUATING", value: "EVALUATING" },
      { label: "AWARDED", value: "AWARDED" },
      { label: "CLOSED", value: "CLOSED" },
    ],
    gridSpan: 1,
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    options: [
      { label: "INR (₹)", value: "INR" },
      { label: "USD ($)", value: "USD" },
      { label: "EUR (€)", value: "EUR" },
    ],
    gridSpan: 1,
  },
  {
    name: "dueDate",
    label: "Submission Deadline",
    type: "date",
    gridSpan: 1,
  },
  {
    name: "description",
    label: "Terms / Specifications",
    type: "textarea",
    gridSpan: 2,
  },
];

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case "RECEIVED":
      return "bg-emerald-900/60 text-emerald-300 border-emerald-800/60";
    case "SENT":
      return "bg-blue-900/60 text-blue-300 border-blue-800/60";
    case "PARTIAL":
      return "bg-amber-900/60 text-amber-300 border-amber-800/60";
    case "EVALUATING":
      return "bg-purple-900/60 text-purple-300 border-purple-800/60";
    case "AWARDED":
      return "bg-teal-900/60 text-teal-300 border-teal-800/60";
    case "DRAFT":
      return "bg-zinc-800 text-zinc-400 border-zinc-700";
    case "CLOSED":
      return "bg-zinc-900 text-zinc-500 border-zinc-800";
    default:
      return "bg-zinc-800 text-zinc-400 border-zinc-700";
  }
}

function getVendorStatusStyle(status: string) {
  switch (status) {
    case "QUOTED":
      return "bg-emerald-950/70 text-emerald-400 border-emerald-800/50";
    case "SENT":
      return "bg-blue-950/70 text-blue-400 border-blue-800/50";
    case "ACKNOWLEDGED":
      return "bg-amber-950/70 text-amber-400 border-amber-800/50";
    case "NO_QUOTE":
      return "bg-red-950/70 text-red-400 border-red-800/50";
    default:
      return "bg-zinc-800/70 text-zinc-400 border-zinc-700";
  }
}

export default function RFQsPage() {
  const { openCompose } = useCompose();

  const [rfqs, setRfqs] = useState<RfqRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRfqs = useCallback(() => {
    fetch("/api/rfqs")
      .then((res) => res.json())
      .then((data) => {
        if (data.rfqs) {
          setRfqs(data.rfqs);
          if (data.rfqs.length > 0 && !selectedId) {
            setSelectedId(data.rfqs[0].id);
          }
        }
      })
      .catch(() => {});
  }, [selectedId]);

  useEffect(() => {
    loadRfqs();

    function handleRfqCreated() {
      loadRfqs();
    }

    window.addEventListener("rfq-created", handleRfqCreated);
    return () => window.removeEventListener("rfq-created", handleRfqCreated);
  }, [loadRfqs]);

  const selectedRfq = rfqs.find((r) => r.id === selectedId) || null;

  const listItems: ItemRowData[] = rfqs.map((rfq) => ({
    id: rfq.id,
    from: rfq.number,
    subject: rfq.title,
    preview: `${rfq.items.length} line item(s) · ${rfq.vendors.length} vendor(s) · Due ${rfq.dueDate || "Not set"}`,
    timestamp: rfq.dueDate ? rfq.dueDate.slice(5) : "Draft",
    isRead: rfq.status === "CLOSED" || rfq.status === "AWARDED",
    tags: [rfq.status],
    avatarFallback: rfq.number.replace("RFQ-", "").slice(0, 2),
  }));

  function handleSelectRfq(id: string) {
    setSelectedId(id);
    setIsEditing(false);
    setErrorMessage(null);
  }

  async function handleEditSubmit(values: Record<string, unknown>) {
    if (!selectedRfq) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/rfqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, id: selectedRfq.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update RFQ");
      setRfqs((prev) =>
        prev.map((r) => (r.id === data.rfq.id ? data.rfq : r))
      );
      setIsEditing(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteRfq() {
    if (!selectedRfq) return;
    if (!confirm(`Are you sure you want to delete ${selectedRfq.number}?`)) return;

    try {
      const res = await fetch(`/api/rfqs?id=${selectedRfq.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRfqs((prev) => prev.filter((r) => r.id !== selectedRfq.id));
        setSelectedId(null);
      }
    } catch {}
  }

  const itemColumns: ColumnDef<RfqItemInput>[] = [
    {
      key: "lineNumber",
      header: "#",
      className: "w-10 text-center font-medium text-zinc-500",
      render: (row) => row.lineNumber,
    },
    {
      key: "description",
      header: "Description",
      className: "font-medium text-zinc-100",
      render: (row) => (
        <div>
          <p className="font-semibold text-zinc-200">{row.description}</p>
          {row.specs && (
            <p className="text-[11px] text-zinc-500">{row.specs}</p>
          )}
        </div>
      ),
    },
    {
      key: "partNumber",
      header: "Part No.",
      className: "w-28 text-zinc-400 font-mono text-[11px]",
      render: (row) => row.partNumber || "—",
    },
    {
      key: "quantity",
      header: "Quantity",
      className: "w-24 text-right",
      render: (row) => (
        <span className="font-medium">
          {Number(row.quantity).toLocaleString()} {row.unit}
        </span>
      ),
    },
    {
      key: "targetPrice",
      header: "Target Unit Price",
      className: "w-32 text-right",
      render: (row) =>
        row.targetPrice
          ? `${selectedRfq?.currency || "INR"} ${Number(row.targetPrice).toLocaleString()}`
          : "—",
    },
    {
      key: "lineTotal",
      header: "Target Total",
      className: "w-32 text-right font-medium text-zinc-300",
      render: (row) => {
        if (!row.targetPrice) return "—";
        const lineTotal = Number(row.quantity) * Number(row.targetPrice);
        return `${selectedRfq?.currency || "INR"} ${lineTotal.toLocaleString()}`;
      },
    },
  ];

  return (
    <div className="split-view">
      <ListPane
        title="RFQs"
        items={listItems}
        selectedId={selectedId}
        onSelect={handleSelectRfq}
        onRefresh={loadRfqs}
        headerAction={
          <button
            id="rfq-new-header-btn"
            onClick={() => openCompose()}
            className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow transition-all hover:bg-blue-500 active:scale-95"
          >
            <Plus size={12} />
            New
          </button>
        }
      />

      <div className="flex h-full flex-col overflow-y-auto bg-zinc-950">
        {selectedRfq ? (
          isEditing ? (
            <div className="flex-1 p-6 max-w-2xl">
              <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">
                    Edit {selectedRfq.number}
                  </h2>
                  <p className="text-xs text-zinc-500">{selectedRfq.title}</p>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  <X size={15} />
                </button>
              </div>

              <SchemaForm
                id="rfq-edit-form"
                fields={RFQ_EDIT_FIELDS}
                initialValues={{
                  title: selectedRfq.title,
                  status: selectedRfq.status,
                  currency: selectedRfq.currency,
                  dueDate: selectedRfq.dueDate || "",
                  description: selectedRfq.description || "",
                }}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditing(false)}
                submitLabel="Save RFQ Changes"
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
              />
            </div>
          ) : (
            <div className="flex-1 p-6 max-w-4xl space-y-6">
              <div className="flex items-start justify-between border-b border-zinc-800 pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-blue-400">
                      {selectedRfq.number}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider",
                        getStatusBadgeStyle(selectedRfq.status)
                      )}
                    >
                      {selectedRfq.status}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-zinc-100">
                    {selectedRfq.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                    {selectedRfq.dueDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-zinc-500" />
                        Deadline: {selectedRfq.dueDate}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <IndianRupee size={13} className="text-zinc-500" />
                      Currency: {selectedRfq.currency}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-zinc-500" />
                      Created: {selectedRfq.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="rfq-detail-compose-btn"
                    onClick={() => openCompose({ initialTitle: selectedRfq.title })}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500 active:scale-95"
                  >
                    <Send size={13} />
                    Invite Vendor
                  </button>
                  <button
                    id="rfq-edit-btn"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                  >
                    <Edit2 size={13} />
                    Edit
                  </button>
                  <button
                    id="rfq-delete-btn"
                    onClick={handleDeleteRfq}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-colors hover:border-red-900/40 hover:bg-red-950/40 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {selectedRfq.description && (
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Terms & Instructions
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    {selectedRfq.description}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 size={15} className="text-blue-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Participating Vendors ({selectedRfq.vendors.length})
                    </h3>
                  </div>
                </div>

                {selectedRfq.vendors.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-zinc-800 p-4 text-center text-xs text-zinc-500">
                    No vendors invited yet. Click &quot;Invite Vendor&quot; to send this RFQ to suppliers.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {selectedRfq.vendors.map((vendor) => (
                      <div
                        key={vendor.vendorId}
                        className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-zinc-200">
                            {vendor.vendorName}
                          </p>
                          <p className="truncate text-[10px] text-zinc-500">
                            {vendor.vendorEmail}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "ml-2 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider",
                            getVendorStatusStyle(vendor.status)
                          )}
                        >
                          {vendor.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={15} className="text-blue-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Line Items ({selectedRfq.items.length})
                    </h3>
                  </div>
                </div>

                <DataTable
                  id="rfq-line-items-table"
                  columns={itemColumns}
                  data={selectedRfq.items}
                  getRowId={(item) => String(item.lineNumber)}
                  emptyMessage="No line items defined for this RFQ."
                />

                {selectedRfq.totalBudget && selectedRfq.totalBudget > 0 && (
                  <div className="flex justify-end pr-3 pt-1 text-xs text-zinc-400">
                    <span>
                      Est. Target Total:{" "}
                      <strong className="text-zinc-100 font-semibold">
                        {selectedRfq.currency} {selectedRfq.totalBudget.toLocaleString()}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-600">
            <FileText size={32} />
            <p className="text-sm font-medium">Select an RFQ or create a new one</p>
            <button
              onClick={() => openCompose()}
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              <Plus size={13} />
              Create RFQ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

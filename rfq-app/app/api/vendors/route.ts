import { NextResponse } from "next/server";
import { fetchAllVendors, createVendorRecord, updateVendorRecord, deleteVendorRecord } from "@/lib/db-store";

export async function GET() {
  const vendors = await fetchAllVendors();
  return NextResponse.json({ vendors });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const created = await createVendorRecord(body);
    return NextResponse.json({ vendor: created }, { status: 201 });
  } catch (_) {
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
    }
    const updated = await updateVendorRecord(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    return NextResponse.json({ vendor: updated });
  } catch (_) {
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
    }
    const deleted = await deleteVendorRecord(id);
    return NextResponse.json({ success: deleted });
  } catch (_) {
    return NextResponse.json({ error: "Failed to delete vendor" }, { status: 500 });
  }
}

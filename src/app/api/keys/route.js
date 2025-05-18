import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory storage for API keys (replace with a database in production)
let apiKeys = [];

export async function GET() {
  return NextResponse.json(apiKeys);
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newKey = {
      id: crypto.randomUUID(),
      name,
      key: `dk_${crypto.randomBytes(32).toString("hex")}`,
      createdAt: new Date().toISOString(),
    };

    apiKeys.push(newKey);
    return NextResponse.json(newKey);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    apiKeys = apiKeys.filter((key) => key.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}

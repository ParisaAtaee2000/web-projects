import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: null, message: "Authentication backend is not connected yet." });
}

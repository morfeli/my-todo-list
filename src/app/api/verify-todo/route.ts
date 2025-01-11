import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  const data = {
    title,
    description,
    id: randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: null,
    completed: false,
  };

  return NextResponse.json(data);
}

import { NextResponse } from "next/server";

let members: { id: number; name: string; email: string; role: string }[] = [
  { id: 1, name: "Alice", email: "alice@test.com", role: "Admin" },
];

export async function GET() {
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newMember = {
    id: Date.now(),
    name: body.name,
    email: body.email,
    role: body.role || "Member",
  };

  members.push(newMember);

  return NextResponse.json(newMember, { status: 201 });
}

import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedKeys = new Set([
  "services",
  "clients",
  "testimonials",
  "pricing",
  "faq",
]);

const getFilePath = (key: string) =>
  path.join(process.cwd(), "data", `${key}.json`);

const isAuthorized = (request: Request) => {
  const token = request.headers.get("x-admin-token");
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return { ok: false, error: "ADMIN_TOKEN no está configurado." };
  }
  if (!token || token !== adminToken) {
    return { ok: false, error: "No autorizado." };
  }
  return { ok: true };
};

export async function GET(request: Request) {
  const auth = isAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key || !allowedKeys.has(key)) {
    return NextResponse.json({ error: "Key inválida." }, { status: 400 });
  }

  const file = await fs.readFile(getFilePath(key), "utf8");
  return NextResponse.json({ data: JSON.parse(file) });
}

export async function POST(request: Request) {
  const auth = isAuthorized(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = (await request.json()) as {
    key?: string;
    payload?: unknown;
  };

  if (!body?.key || !allowedKeys.has(body.key)) {
    return NextResponse.json({ error: "Key inválida." }, { status: 400 });
  }

  let parsed: unknown;
  try {
    parsed =
      typeof body.payload === "string"
        ? JSON.parse(body.payload)
        : body.payload;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  await fs.writeFile(
    getFilePath(body.key),
    JSON.stringify(parsed, null, 2),
  );

  return NextResponse.json({ ok: true });
}

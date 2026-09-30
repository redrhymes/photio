import { NextResponse } from "next/server";

const required = ["name", "email", "phone", "city", "shootType"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  for (const field of required) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
  }
  if (!emailPattern.test(body.email as string)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!/^\d{10}$/.test(body.phone as string)) {
    return NextResponse.json({ error: "Please enter a 10-digit mobile number." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEADS_TO_EMAIL;
  const sender = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please email [EMAIL] or WhatsApp us." }, { status: 503 });
  }

  const rows = [
    ["Name", body.name], ["Email", body.email], ["Phone", body.phone], ["City", body.city],
    ["Shoot type", body.shootType], ["Shoot date", body.shootDate], ["Budget", body.budget],
    ["Add-ons", Array.isArray(body.addOns) ? body.addOns.join(", ") : ""],
    ["Outstation", body.outstation], ["Requested set", body.requestedSet], ["Message", body.message],
  ];
  const escaped = rows.map(([label, value]) => `<p><strong>${label}:</strong> ${String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char)}</p>`).join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: body.email,
      subject: `Photio enquiry — ${body.name}`,
      html: `<h1>New Photio enquiry</h1>${escaped}`,
    }),
  });
  if (!response.ok) {
    console.error("Resend rejected Photio contact enquiry", response.status, await response.text());
    return NextResponse.json({ error: "We couldn't send your note just now. Please email [EMAIL] or try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

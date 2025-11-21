import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  draftMode().enable()
  const redirectTo = req.nextUrl.searchParams.get("redirect") || "/"
  return NextResponse.redirect(new URL(redirectTo, req.url))
}

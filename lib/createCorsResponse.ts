import { NextResponse } from "next/server";

export function createCorsResponse(
  body: any,
  options: { status: number } = { status: 200 }
) {
  return new NextResponse(JSON.stringify(body), {
    status: options.status,
  });
}

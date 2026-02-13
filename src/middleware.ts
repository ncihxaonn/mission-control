import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD || "jarvis123";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (pwd === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Auth Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Mission Control"',
    },
  });
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

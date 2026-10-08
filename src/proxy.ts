import { NextResponse, type NextRequest } from "next/server";

const STRATEGY_HOST_PREFIX = "strategy.";
const DAVID_HOST_PREFIX = "david.";
const LISTICLE_HOST_PREFIX = "listicle.";

// strategy.<domain>/<slug> is served from the private /strategy/<slug> route.
// The route is not reachable on any other host.
// david.<domain> is David's public Upwork portfolio, served from /david.
// listicle.<domain>/<slug> is a private advertorial/listicle pitch artifact,
// served from /listicle/<slug>, same noindex treatment as strategy.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (host.startsWith(DAVID_HOST_PREFIX)) {
    // Let public assets (logos, screenshots, favicon) through untouched.
    if (/\.[a-z0-9]+$/i.test(pathname) && pathname !== "/robots.txt") {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/david${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (host.startsWith(LISTICLE_HOST_PREFIX)) {
    // Let public assets (logos, screenshots, favicon) through untouched.
    if (/\.[a-z0-9]+$/i.test(pathname) && pathname !== "/robots.txt") {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = `/listicle${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (!host.startsWith(STRATEGY_HOST_PREFIX)) {
    if (pathname === "/strategy" || pathname.startsWith("/strategy/")) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (pathname === "/david" || pathname.startsWith("/david/")) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (pathname === "/listicle" || pathname.startsWith("/listicle/")) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.next();
  }

  // Let public assets (logos, screenshots, favicon) through untouched.
  if (/\.[a-z0-9]+$/i.test(pathname) && pathname !== "/robots.txt") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/strategy${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|studio).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token?.userType === "creator") {
      return NextResponse.redirect(new URL("/dashboard/creator", request.url));
    } else if (token?.userType === "advertiser") {
      return NextResponse.redirect(
        new URL("/dashboard/advertiser", request.url)
      );
    }
  }

  if (path === "/dashboard") {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/login", request.url);
        url.searchParams.set("callbackUrl", "/dashboard");
        return NextResponse.redirect(url);
      }

      if (token.userType === "creator") {
        return NextResponse.redirect(
          new URL("/dashboard/creator", request.url)
        );
      } else if (token.userType === "advertiser") {
        return NextResponse.redirect(
          new URL("/dashboard/advertiser", request.url)
        );
      } else {
        return NextResponse.redirect(new URL("/login/user-type", request.url));
      }
    } catch (error) {
      console.error("Error in dashboard middleware:", error);
      return NextResponse.next();
    }
  }

  if (path === "/dashboard/creator" || path.startsWith("/dashboard/creator/")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (token.userType !== "creator") {
      if (token.userType === "advertiser") {
        return NextResponse.redirect(
          new URL("/dashboard/advertiser", request.url)
        );
      } else {
        return NextResponse.redirect(new URL("/login/user-type", request.url));
      }
    }
  }

  if (
    path === "/dashboard/advertiser" ||
    path.startsWith("/dashboard/advertiser/")
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (token.userType !== "advertiser") {
      if (token.userType === "creator") {
        return NextResponse.redirect(
          new URL("/dashboard/creator", request.url)
        );
      } else {
        return NextResponse.redirect(new URL("/login/user-type", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};

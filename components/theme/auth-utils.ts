import { signOut as nextAuthSignOut } from "next-auth/react";
import { deleteCookie } from "cookies-next";

export const signOut = async (callbackUrl = "/") => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userProfile");

    sessionStorage.clear();

    const cookieNames = [
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url",
      "next-auth.state",
      "__Secure-next-auth.session-token",
      "__Secure-next-auth.callback-url",
      "__Host-next-auth.csrf-token",
    ];

    // Clear cookies with different path and domain options
    cookieNames.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname};`;

      deleteCookie(name, { path: "/" });
    });

    // Call server-side logout API to clear cookies on the server
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Error calling logout API:", error);
    }
  }

  // Use NextAuth signOut with force option
  return nextAuthSignOut({
    callbackUrl,
    redirect: true,
  });
};

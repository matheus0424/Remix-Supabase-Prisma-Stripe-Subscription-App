import { createCookie } from "@vercel/remix";

export const accessToken = createCookie("sb-access-token", {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

export const refreshToken = createCookie("sb-refresh-token", {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

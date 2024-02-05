import { supabase } from "./supabase";
import { db } from "./database";
import { accessToken, refreshToken } from "./cookies.server";
import { redirect } from "@remix-run/node";

export async function getUser(request: Request) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const accessTokenCookie = await accessToken.parse(cookieHeader);
    const refreshTokenCookie = await refreshToken.parse(cookieHeader);

    if (
      !accessTokenCookie ||
      !refreshTokenCookie ||
      typeof accessTokenCookie !== "string" ||
      typeof refreshTokenCookie !== "string"
    ) {
      return null;
    }

    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshTokenCookie,
      access_token: accessTokenCookie,
    });

    if (error || !data?.user) {
      return null;
    }

    const dbUser = await getOrCreateUserForSession(data.user.id);

    const user = {
      email: data.user.email,
      id: data.user.id,
      role: dbUser.role,
      proTier: dbUser.proTier,
    };
    return user;
  } catch (e) {
    return null;
  }
}

export async function getOrCreateUserForSession(userId: string) {
  let user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      proTier: true,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
        proTier: true,
      },
    });
  }
  return user;
}


export async function ensureUserIsAdmin(request: Request){
  const user = await getUser(request);
  if (!user || user.role !== "ADMIN") {
    throw redirect("/");
  }
  return user;
}
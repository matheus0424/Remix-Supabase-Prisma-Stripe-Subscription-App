import { type LoaderFunctionArgs } from "@vercel/remix";
import { accessToken, refreshToken } from "~/lib/cookies.server";
import { supabase } from "~/lib/supabase";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the Auth Helpers package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange

    if (!code) {
      return new Response(null, {
        status: 400,
      });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return new Response(null, {
        status: 400,
      });
    }

    const { access_token, refresh_token } = data.session;

    const headers = new Headers();
    headers.append("Set-Cookie", await accessToken.serialize(access_token));
    headers.append("Set-Cookie", await refreshToken.serialize(refresh_token));
    headers.append("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 400,
    });
  }
}

import { accessToken, refreshToken } from "~/lib/cookies.server";

export async function action() {
    const headers = new Headers();
    headers.append("Set-Cookie", await accessToken.serialize('', {maxAge: 0}));
    headers.append("Set-Cookie", await refreshToken.serialize('', {maxAge: 0}));
    headers.append("Location", "/");
    return new Response(null, {
        status: 302,
        headers,
    });
}
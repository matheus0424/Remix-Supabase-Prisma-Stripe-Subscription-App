import { json, type LoaderFunctionArgs } from "@vercel/remix";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/lib/user.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return json({ user });
}

export default function Home() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 dark:from-purple-600 via-purple-800 to-purple-900 dark:to-purple-700 inline-block text-transparent bg-clip-text">
        Supabase Next Template
      </h1>
      {user ? (
        <>
          <p className="text-xl">Welcome, {user.email}</p>
          <Form method="post" action="/api/auth/logout">
            <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
              Logout
            </button>
          </Form>
        </>
      ) : (
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to="/login"
        >
          Login
        </Link>
      )}
      <Link
        to="/pricing"
        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        Go to Pricing
      </Link>
    </>
  );
}

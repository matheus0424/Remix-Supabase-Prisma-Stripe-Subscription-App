import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Link } from "@remix-run/react";
import { ensureUserIsAdmin } from "~/lib/user.server";
import { type LoaderFunctionArgs } from "@vercel/remix";

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureUserIsAdmin(request);
  return null;
}

export default function Dashboard() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Admin Dashboard
      </h1>
      <ul className="w-full max-w-xl flex pt-8">
        <li>
          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>View sales and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/admin/dashboard/sales"
              >
                Show
              </Link>
            </CardContent>
          </Card>
        </li>
      </ul>
    </>
  );
}

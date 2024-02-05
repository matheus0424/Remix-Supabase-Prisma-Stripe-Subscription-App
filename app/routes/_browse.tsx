import { Outlet } from "@remix-run/react";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function BrowseLayout() {
  return (
    <>
      <nav className="flex justify-end p-4">
        <ThemeToggle />
      </nav>
      <main className="flex flex-col container mx-auto gap-4 items-center">
        <Outlet />
      </main>
    </>
  );
}

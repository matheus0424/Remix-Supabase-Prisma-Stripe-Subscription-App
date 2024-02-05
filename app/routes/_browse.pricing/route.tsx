import { getUser } from "~/lib/user.server";
import PricingItem from "./_components/Pricing";
import { products } from "~/lib/products";
import { type LoaderFunctionArgs, json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  return json({ user });
}

export default function PricingPage() {
  const { user } = useLoaderData<typeof loader>();

  const loggedIn = !!user;
  return (
    <div className="flex flex-col">
      <h1 className="text-black dark:text-white text-5xl font-bold text-center">
        Get job-ready faster
      </h1>

      <p className="text-lg leading-8 mt-6 mx-auto text-gray-800 dark:text-gray-300 font-medium text-center max-w-md">
        Become the best version of yourself by improving your coding skills and
        unlocking your potential!
      </p>
      <div className="grid xl:grid-cols-3 gap-8 max-w-full mt-16 mb-24">
        {products.map((product) => {
          return (
            <PricingItem
              key={product.proTier}
              product={product}
              type="buy"
              loggedIn={loggedIn}
            />
          );
        })}
      </div>
    </div>
  );
}

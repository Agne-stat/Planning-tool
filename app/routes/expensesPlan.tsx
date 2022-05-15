import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  expensesPlanListItems: Array<{ id: string; name: string; cost: string; }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    expensesPlanListItems: await db.expensesPlan.findMany(),
  };
  return json(data);
};

export default function ExpensesPlanRoute() {
  const data = useLoaderData<LoaderData>();
  
  return (
      <main>
        <Outlet />
        <div>
          <ul>
            {data.expensesPlanListItems.map((expensesPlan) => (
                <li key={expensesPlan.id}>
                  <Link to={expensesPlan.id}>{expensesPlan.name +" - "+ expensesPlan.cost}</Link>
                </li>
              ))}
          </ul>
        </div>
        <button className="button">
          <Link to="create" className="button-link">
            New purchase
          </Link>
        </button>
      </main>
      );
}

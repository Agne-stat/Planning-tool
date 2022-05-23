import { LinksFunction, LoaderFunction,json } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

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
            {data.expensesPlanListItems.map(({name, cost, id}) => (
                <li key={id}>
                  <Link to={id}>{name +" - "+ cost}</Link>
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

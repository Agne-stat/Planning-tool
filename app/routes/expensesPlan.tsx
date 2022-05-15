import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

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
    <div>
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
        <button>
          <Link to="create" className="button">
            New purchase
          </Link>
        </button>
      </main>
    </div>
  );
}

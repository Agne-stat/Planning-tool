import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

type LoaderData = {
  dayPlanListItems: Array<{ id: string; name: string; startTime: string; }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    dayPlanListItems: await db.dayPlan.findMany(),
  };
  return json(data);
};

export default function DayPlanRoute() {
  const data = useLoaderData<LoaderData>();
  
  return (
    <div>
      <main>
        <Outlet />
        <div>
          <ul>
            {data.dayPlanListItems.map((dayPlan) => (
                <li key={dayPlan.id}>
                  <Link to={dayPlan.id}>{dayPlan.startTime +" - "+ dayPlan.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <button>
          <Link to="create" className="button">
            New item
          </Link>
        </button>
      </main>
    </div>
  );
}

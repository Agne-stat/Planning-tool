import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

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
        <button className="button">
          <Link to="create" className="button-link">
            New plan
          </Link>
        </button>
      </main>
  );
}

import { LinksFunction, LoaderFunction,json } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  todoListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    todoListItems: await db.todo.findMany(),
  };
  return json(data);
};

export default function TodoRoute() {
  const data = useLoaderData<LoaderData>();
  return (
      <main>
        <Outlet />
        <div>
          <ul>
            {data.todoListItems.map(({name, id}) => (
                <li key={id}>
                  <Link to={id}>{name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <button className="button">
          <Link to="create" className="button-link">
            New to do
          </Link>
        </button>
      </main>
  );
}

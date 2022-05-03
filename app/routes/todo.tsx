import type { LinksFunction,   LoaderFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/todo.css";

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

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
            >
              <span className="logo-medium">Homepage</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
          <Link to=".">Get a random todo</Link>
            <p>Item from to do list</p>
            <ul>
            {data.todoListItems.map((todo) => (
                <li key={todo.id}>
                  <Link to={todo.id}>{todo.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="create" className="button">
              Create task
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}




import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

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
    <div>
      <main>
        <Outlet />
        <div>
          <ul>
            {data.todoListItems.map((todo) => (
                <li key={todo.id}>
                  <Link to={todo.id}>{todo.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <button>
          <Link to="create" className="button">
            New to do
          </Link>
        </button>
      </main>
    </div>
  );
}

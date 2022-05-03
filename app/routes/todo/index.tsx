import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Todo } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { randomTodo: Todo };

export const loader: LoaderFunction = async () => {
  const count = await db.todo.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomTodo] = await db.todo.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  const data: LoaderData = { randomTodo };
  return json(data);
};

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random todo:</p>
      <p>{data.randomTodo.content}</p>
      <Link to={data.randomTodo.id}>
        "{data.randomTodo.name}" Permalink
      </Link>
    </div>
  );
}
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Todo } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { todo: Todo };

export const loader: LoaderFunction = async ({
  params,
}) => {
  const todo = await db.todo.findUnique({
    where: { id: params.todoId },
  });
  if (!todo) throw new Error("Joke not found");
  const data: LoaderData = { todo };
  return json(data);
};

export default function TodoRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.todo.content}</p>
      <Link to=".">{data.todo.name} Permalink</Link>
    </div>
  );
}

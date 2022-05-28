import { ActionFunction, LoaderFunction, redirect, json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import type { Todo } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { todo: Todo };

export const loader: LoaderFunction = async ({
  params,
}) => {
  const todo = await db.todo.findUnique({
    where: { id: params.todoId },
  });
  if (!todo) throw new Error("Todo not found");
  const data: LoaderData = { todo };
  return json(data);
};

export const action: ActionFunction = async ({
  request,
  params,
}) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(
      `The _method ${form.get("_method")} is not supported`,
      { status: 400 }
    );
  }
  await db.todo.findUnique({
    where: { id: params.todoId },
  });
  await db.todo.delete({ where: { id: params.todoId } });
  return redirect("/todo");
};

export default function TodoRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>{data.todo.name}</p>
      <form method="post">
        <input
          type="hidden"
          name="_method"
          value="delete"
        />
        <button type="submit" className="button">
          Delete
        </button>
      </form>
    </div>
  );
}


export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.todoId}?
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { todoId } = useParams();
  return (
    <div className="error-container">{`There was an error loading todo item by the id ${todoId}. Sorry.`}</div>
  );
}
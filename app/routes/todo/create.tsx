import { Link } from "@remix-run/react/node_modules/react-router-dom";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof name !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name };

  const todo = await db.todo.create({ data: fields });
  return redirect(`/todo/${todo.id}`);
};

export default function CreateTodoRoute() {
  return (
    <div>
      {/* Not entirely sure this is necessary having a separate route to create todo */}
      <p>Add </p>
      <form method="post">
        <div>
          <label>
            Task: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
      <button>
        <Link to="/todo" className="button">
          Cancel
        </Link>
      </button>
    </div>
  );
}

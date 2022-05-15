import { Link } from "@remix-run/react/node_modules/react-router-dom";
import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const name = form.get("name");

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
    <div >
      <form method="post">
        <div>
          <label>
            Task: <input type="text" name="name" />
          </label>
        </div>
        <div className="form-buttons-container">
          <button type="submit" className="button">
            Add
          </button>
          <button className="button">
            <Link to="/todo" className="button-link">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}


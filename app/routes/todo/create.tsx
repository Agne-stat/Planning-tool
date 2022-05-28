import { Link } from "@remix-run/react/node_modules/react-router-dom";
import  { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
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

  await db.todo.create({ data: fields });
  return redirect(`/todo`);
};

export default function CreateTodoRoute() {
  return (
    <div >
      <h3>New todo:</h3>
      <form method="post">
        <div className="form">
          <label>
            Task: 
          </label>
          <input type="text" name="name" />
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


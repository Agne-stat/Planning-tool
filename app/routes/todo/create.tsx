import { Link } from "@remix-run/react/node_modules/react-router-dom";
import { Form, useActionData } from "@remix-run/react";
import  { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const validateTodo = (name:string) => {
  if (!name) {
    return "Field can not be empty";
  } 
};

export const action: ActionFunction = async ({
  request,
}) => {

  const form = await request.formData();
  const data = Object.fromEntries(form);
  const name = form.get("name");

  const formErrors = {
    name: validateTodo(data.name),
  };

  if (Object.values(formErrors).some(Boolean)) return { formErrors };
  const fields = { name };
  await db.todo.create({ data: fields });

  return redirect(`/todo`);
};

export default function CreateTodoRoute() {
  const actionData = useActionData();
  return (
    <div >
      <h3>New todo:</h3>
      <Form method="post">
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
        {actionData?.formErrors?.name ? (
          <p style={{ color: "red" }}>{actionData?.formErrors?.name}</p>
        ) : null}
      </Form>
    </div>
  );
}


import { Link } from "@remix-run/react/node_modules/react-router-dom";
import { Form, useActionData } from "@remix-run/react";
import  { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction= () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const validateExpenseName = (name:string) => {
  if (!name) {
    return "Purchase field can not be empty";
  } 
};

const validateExpenseValue = (cost:number) => {
  if (!cost) {
    return "Cost field can not be empty";
  } 
};

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const name = form.get("name");
  const cost = form.get("cost");
  const formatedCost = Number(cost)

  const formErrors = {
    name: validateExpenseName(data.name),
    cost: validateExpenseValue(data.cost)
  };
  if (Object.values(formErrors).some(Boolean)) return { formErrors };

  const fields = { name, cost:formatedCost } 
  await db.expensesPlan.create({ data: fields });

  return redirect(`/expensesPlan`);
};

export default function CreateExpensesPlanRoute() {
  const actionData = useActionData();

  return (
    <div>
      <h3>New expense:</h3>
      <Form method="post">
        <div className="form">
          <label>
            Cost: 
          </label>
          <input type="number" name="cost" />
        </div>
        <div className="form">
          <label>
            Purchase: 
          </label>
          <input type="text" name="name" />
        </div>
        <div className="form-buttons-container">
          <button type="submit" className="button">
            Add
          </button>
          <button className="button">
            <Link to="/dayPlan" className="button-link">
              Cancel
            </Link>
          </button>
        </div>
        {actionData?.formErrors?.name ? (
          <p style={{ color: "red" }}>{actionData?.formErrors?.name}</p>
        ) : null}
        {actionData?.formErrors?.cost ? (
          <p style={{ color: "red" }}>{actionData?.formErrors?.cost}</p>
        ) : null}
      </Form>
    </div>
  );
}



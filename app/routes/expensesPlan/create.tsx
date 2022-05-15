import { Link } from "@remix-run/react/node_modules/react-router-dom";
import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction= () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const name = form.get("name");
  const cost = form.get("cost");

  if (
    typeof name !== "string" ||
    typeof cost !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, cost };

  const expensesPlan = await db.expensesPlan.create({ data: fields });
  return redirect(`/expensesPlan/${expensesPlan.id}`);
};

export default function CreateExpensesPlanRoute() {
  return (
    <div>
      <form method="post">
        <div>
          <label>
            Cost: <input type="text" name="cost" />
          </label>
        </div>
        <div>
          <label>
            Purchase: <input type="text" name="name" />
          </label>
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
      </form>
    </div>
  );
}



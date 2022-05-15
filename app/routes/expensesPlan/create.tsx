import { Link } from "@remix-run/react/node_modules/react-router-dom";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const name = form.get("name");
  const cost = form.get("cost");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
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
      <p>Add </p>
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
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
      <button>
        <Link to="/dayPlan" className="button">
          Cancel
        </Link>
      </button>
    </div>
  );
}

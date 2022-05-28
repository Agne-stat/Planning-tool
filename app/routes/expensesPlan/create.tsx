import { Link } from "@remix-run/react/node_modules/react-router-dom";
import  { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
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
  const formatedCost = Number(cost)

  if ( typeof name !== "string"){
      
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, cost:formatedCost } 

  await db.expensesPlan.create({ data: fields });
  return redirect(`/expensesPlan`);
};

export default function CreateExpensesPlanRoute() {
  return (
    <div>
      <h3>New expense:</h3>
      <form method="post">
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
      </form>
    </div>
  );
}



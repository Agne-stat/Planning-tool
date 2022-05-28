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
  const startTime = form.get("startTime");
  const content = form.get("content");

  if (
    typeof name !== "string" ||
    typeof startTime !== "string" ||
    typeof content !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, startTime, content };

  await db.dayPlan.create({ data: fields });
  return redirect(`/dayPlan`);
};

export default function CreateDayPlanRoute() {
  return (
    <div>
      <h3>New plan:</h3>
      <form method="post">
        <div className="form">
          <label>
            Time: 
          </label>
          <input type="text" name="startTime" />
        </div>
        <div className="form">
          <label>
            Task: 
          </label>
          <input type="text" name="name" />
        </div>
        <div className="form">
          <label>
            Content: 
          </label>
          <textarea  name="content" />
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




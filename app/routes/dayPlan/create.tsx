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
  const startTime = form.get("startTime");
  const content = form.get("content");

  if (
    typeof name !== "string" ||
    typeof startTime !== "string" ||
    typeof content !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, startTime, content };

  const dayPlan = await db.dayPlan.create({ data: fields });
  return redirect(`/dayPlan/${dayPlan.id}`);
};

export default function CreateDayPlanRoute() {
  return (
    <div>
      <form method="post">
        <div>
          <label>
            Time: <input type="text" name="startTime" />
          </label>
        </div>
        <div>
          <label>
            Task: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <input type="text" name="content" />
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




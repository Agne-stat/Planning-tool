import { Link } from "@remix-run/react/node_modules/react-router-dom";
import { Form, useActionData } from "@remix-run/react";
import  { ActionFunction, LinksFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const validateDayplanName = (name:string) => {
  if (!name) {
    return "Task field can not be empty";
  } 
};

const validateDayplanStart = (startTime:Date) => {
  if (!startTime) {
    return "Time field can not be empty";
  } 
};


export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const name = form.get("name");
  const startTime = form.get("startTime");
  const content = form.get("content");

  const formErrors = {
    name: validateDayplanName(data.name),
    startTime: validateDayplanStart(data.startTime)
  };
  if (Object.values(formErrors).some(Boolean)) return { formErrors };

  const fields = { name, startTime, content };

  await db.dayPlan.create({ data: fields });
  return redirect(`/dayPlan`);
};

export default function CreateDayPlanRoute() {
  const actionData = useActionData();

  return (
    <div>
      <h3>New plan:</h3>
      <Form method="post">
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
        {actionData?.formErrors?.name ? (
          <p style={{ color: "red" }}>{actionData?.formErrors?.name}</p>
        ) : null}
        {actionData?.formErrors?.startTime ? (
          <p style={{ color: "red" }}>{actionData?.formErrors?.startTime}</p>
        ) : null}
      </Form>
    </div>
  );
}




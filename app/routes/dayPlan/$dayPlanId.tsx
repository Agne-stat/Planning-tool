import { ActionFunction, LoaderFunction, redirect, json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import type { DayPlan } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { dayPlan: DayPlan };

export const loader: LoaderFunction = async ({
  params,
}) => {
  const dayPlan = await db.dayPlan.findUnique({
    where: { id: params.dayPlanId },
  });
  if (!dayPlan) throw new Error("Todo not found");
  const data: LoaderData = { dayPlan };
  return json(data);
};

export const action: ActionFunction = async ({
  request,
  params,
}) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(
      `The _method ${form.get("_method")} is not supported`,
      { status: 400 }
    );
  }
  await db.dayPlan.findUnique({
    where: { id: params.dayPlanId },
  });
  await db.dayPlan.delete({ where: { id: params.dayPlanId } });
  return redirect("/dayPlan");
};

export default function TodoRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>{data.dayPlan.content}</p>
      <form method="post">
        <input
          type="hidden"
          name="_method"
          value="delete"
        />
        <button type="submit" className="button">
          Delete
        </button>
      </form>
    </div>
  );
}


export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.dayPlanId}?
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { dayPlanId } = useParams();
  return (
    <div className="error-container">{`There was an error loading todo item by the id ${dayPlanId}. Sorry.`}</div>
  );
}
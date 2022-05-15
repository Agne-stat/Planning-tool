import { Outlet } from "@remix-run/react";

export default function PlanDayRoute() {
  return (
    <div>
       <h2>Day's plan view</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";


export default function PlanDayRoute() {
  return (
    <div>
       <h1>
        <Link to="/">Plan your day</Link>
       </h1>
       <h2>Day's plan view</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

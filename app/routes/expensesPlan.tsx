import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";


export default function ExpensesPalnRoute() {
  return (
    <div>
       <h1>
        <Link to="/">Plan your day</Link>
       </h1>
       <h2>Expenses plan view</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

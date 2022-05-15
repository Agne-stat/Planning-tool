import { Outlet } from "@remix-run/react";


export default function ExpensesPalnRoute() {
  return (
    <div>
       <h2>Expenses plan view</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

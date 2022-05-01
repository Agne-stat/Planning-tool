import { Outlet } from "@remix-run/react";

export default function TodoRoute() {
  return (
    <div>
      <h1>Todo View</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

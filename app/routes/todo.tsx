import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";


export default function TodoRoute() {
  return (
    <div>
       <h1>
        <Link to="/">Plan your day</Link>
       </h1>
       <h2>To do view</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

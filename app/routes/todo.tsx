import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";


export default function TodoRoute() {
  return (
    <div>
       <h2>To do view</h2>
      <main>
        <button>
          <Link to="create" className="button">
            New to do
          </Link>
        </button>
        <Outlet />
      </main>
    </div>
  );
}

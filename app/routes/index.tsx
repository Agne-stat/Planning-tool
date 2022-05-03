import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>To do list</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="todo">To do's</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}



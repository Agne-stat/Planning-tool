import { LiveReload, Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react/node_modules/react-router-dom";
import Calendor from "./components/Calendor";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Some app</title>
      </head>
      <body>
        <header>
          <Link to='/'>Plan your day</Link>
        </header>
        <main>
          <Calendor />
          <Outlet />
          <LiveReload />
        </main>
      </body>
    </html>
  );
}
// home
// home/day
// home/day/plan-your-day
// home/day/plan-expenses
// home/day/todo

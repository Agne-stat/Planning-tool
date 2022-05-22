import { Links, LiveReload, Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react/node_modules/react-router-dom";
import Calendor from "./components/Calendor";
import globalStylesUrl from "./styles/global.css";
import calendorStylesUrl from "./styles/components/calendor.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: calendorStylesUrl,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Some app</title>
        <Links />
      </head>
      <body>
        <main>
          <h1>
            <Link to='/' className='heading-link'>Plan your day</Link>
          </h1>
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

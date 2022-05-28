import { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react"

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {  
  return (
    <div className="routes-container">
      <div id="todos-container" className="routes-buttons">
        <Link to="todo">To do's</Link>
      </div>
      <div id="dayPlan-container" className="routes-buttons">
        <Link to="dayPlan">Day plan</Link>
      </div>
      <div id="expensesPlan-container" className="routes-buttons">
        <Link to="expensesPlan">Expenses plan</Link>
      </div>
    </div>
  );
}
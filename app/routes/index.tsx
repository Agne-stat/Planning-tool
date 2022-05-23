
import { Link } from "@remix-run/react";

export default function IndexRoute() {  
  return (
    <div>
      <main>
        <div>
          <div>
            <Link to="todo">To do's</Link>
          </div>
          <div>
            <Link to="dayPlan">Day plan</Link>
          </div>
          <div>
            <Link to="expensesPlan">Expenses plan</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
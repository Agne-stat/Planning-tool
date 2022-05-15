import { Link } from "@remix-run/react/node_modules/react-router-dom";

export default function CreateTodoRoute() {
  return (
    <div>
      {/* Not entirely sure this is necessary having a separate route to create todo */}
      <p>Add </p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
      <button>
        <Link to="/todo" className="button">
          Cancel
        </Link>
      </button>
    </div>
  );
}

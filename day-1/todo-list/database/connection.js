import pg from "pg";
import createUserTable from "../model/user.model.js";
import createTodoTable from "../model/todo.model.js";
const { Pool } = pg;

const database = new Pool({
  host: "localhost",
  user: "zahin",
  database: "todo-list",
  password: "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export function databaseInit() {
  database.query("SELECT NOW()", function (err, res) {
    if (err) {
      console.log("Database connection error");
      // stop the server if database connection error
      process.exit(1);
    }
    if (res) {
      console.log(`Database connected at ${res.rows[0].now}`);
      createUserTable();
      createTodoTable();
    }
  });
}

export default database;

import database from "../database/connection.js";

function createTodoTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
  database.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      console.log("Todo table created");
    }
  });
}

export default createTodoTable;

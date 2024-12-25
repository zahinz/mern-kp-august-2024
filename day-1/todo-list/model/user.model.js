import database from "../database/connection.js";

function createUserTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
  database.query(query, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      console.log("User table created");
    }
  });
}

export default createUserTable;

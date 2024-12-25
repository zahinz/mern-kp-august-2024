import database from "../database/connection.js";

function listAllTodos(req, res) {
  const userId = req.user;
  const query = `SELECT * FROM todos WHERE user_id = $1`;
  database.query(query, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    const data = {
      message: `${results.rowCount} todos found`,
      data: results.rows,
    };
    res.status(200).json(data);
  });
}

function createTodo(req, res) {
  const userId = req.user;
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  const query = `INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
  database.query(query, [title, description, userId], (error, results) => {
    if (error) {
      throw error;
    }
    const data = {
      message: "Todo created successfully",
      data: results.rows[0],
    };
    res.status(201).json(data);
  });
}

const todoController = {
  listAllTodos,
  createTodo,
};

export default todoController;

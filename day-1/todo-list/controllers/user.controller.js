import database from "../database/connection.js";
import jwt from "jsonwebtoken";

function getUserDetails(req, res) {
  const userId = req.user;
  const query = `
  SELECT * FROM users
  WHERE id = $1;
  `;

  database.query(query, [userId], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];
    return res.json({
      message: "User data received",
      data: user,
    });
  });
}

function registerUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Check if email is valid using regex
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  // Check if user with email already exists
  const checkUserQuery = `
  SELECT * FROM users
  WHERE email = $1;
  `;
  database.query(checkUserQuery, [email], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    console.log("HELLO", result);
    if (result.rows.length > 0) {
      return res.status(409).json({
        message: "User with email already exists",
      });
    }

    // If all checks pass, insert user into database
    const insertNewUserQuery = `
  INSERT INTO users (email, password_hash) 
  VALUES ($1, $2) 
  RETURNING id, email, created_at;
  `;

    // Execute query
    database.query(
      insertNewUserQuery,
      [email, password],
      function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Internal server error",
          });
        }
        if (result) {
          const user = result.rows[0];
          return res.json({
            message: "User registered successfully",
            data: user,
          });
        }
      }
    );
  });
}

function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // check email is exist in database
  const checkUserQuery = `
  SELECT * FROM users
  WHERE email = $1;
  `;

  database.query(checkUserQuery, [email], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];
    if (user.password_hash !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id }, "SUPA-DUPA-SECRET-KEY");

    return res.json({
      message: "User logged in successfully",
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    });
  });
}

const userController = {
  getUserDetails,
  registerUser,
  loginUser,
};

export default userController;

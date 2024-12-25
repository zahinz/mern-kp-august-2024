-- Create Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Index
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- Create Todo
INSERT INTO todos (user_id, title, description) 
VALUES ($1, $2, $3) 
RETURNING *;

-- Read Todos
-- Get all todos for a user
SELECT * FROM todos 
WHERE user_id = $1 
ORDER BY created_at DESC;

-- Get single todo
SELECT * FROM todos 
WHERE id = $1 AND user_id = $2;

-- Update Todo
UPDATE todos 
SET title = $1, 
    description = $2, 
    is_completed = $3, 
    updated_at = CURRENT_TIMESTAMP 
WHERE id = $4 AND user_id = $5 
RETURNING *;

-- Delete Todo
DELETE FROM todos 
WHERE id = $1 AND user_id = $2 
RETURNING *;

-- User Operations
-- Create User
INSERT INTO users (email, password_hash) 
VALUES ($1, $2) 
RETURNING id, email, created_at;

-- Get User by Email
SELECT * FROM users 
WHERE email = $1;
import express from "express";
import healthRouter from "./routes/health.js";
import userRouter from "./routes/user.js";
import { databaseInit } from "./database/connection.js";
import todoRouter from "./routes/todo.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test database connection when server start
databaseInit();

app.use("/health", healthRouter);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(PORT, function () {
  console.log(
    `My server run at port ${PORT}. Open at browser http://localhost:8080`
  );
});

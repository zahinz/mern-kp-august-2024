import express from "express";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const data = {
    message: "Method GET. Server is healthy",
    data: true,
  };
  return res.json(data);
});

app.post("/", function (req, res) {
  const body = req.body;
  const data = {
    message: "Method POST. Server is healthy",
    data: true,
    body: body,
  };
  return res.json(data);
});

app.listen(PORT, function () {
  console.log(
    `My server run at port ${PORT}. Open at browser http://localhost:8080`
  );
});

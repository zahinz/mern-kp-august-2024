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

// params -> GET
// if the dynamic data only 1 and GET -> PARAMS
app.get("/:username", function (req, res) {
  console.log(req.params);
  const username = req.params.username;
  const data = {
    message: "User data received",
    data: username,
  };
  return res.json(data);
});

// dynamic data more than 2
// form
// POST & body
app.post("/bmi", function (req, res) {
  const weight = req.body.weight;
  const height = req.body.height;
  if (!height || !weight) {
    return res.status(400).json("Invalid request");
  }
  const bmi = weight / Math.pow(height, 2);
  const data = {
    message: "bmi user received",
    data: bmi,
  };
  return res.json(data);
});

app.listen(PORT, function () {
  console.log(
    `My server run at port ${PORT}. Open at browser http://localhost:8080`
  );
});

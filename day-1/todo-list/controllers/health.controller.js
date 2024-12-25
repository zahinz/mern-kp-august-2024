function getHealth(req, res) {
  const data = {
    message: "Method GET. Server is healthy",
    data: true,
  };
  return res.json(data);
}

function postHealth(req, res) {
  const body = req.body;
  const data = {
    message: "Method POST. Server is healthy",
    data: true,
    body: body,
  };
  return res.json(data);
}

const healthController = {
  getHealth,
  postHealth,
};

export default healthController;

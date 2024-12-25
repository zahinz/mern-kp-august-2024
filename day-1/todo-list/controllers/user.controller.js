function getUserDetails(req, res) {
  console.log(req.params);
  const username = req.params.username;
  const data = {
    message: "User data received",
    data: username,
  };
  return res.json(data);
}

const userController = {
  getUserDetails,
};

export default userController;
